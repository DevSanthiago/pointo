using Microsoft.Extensions.Configuration;
using PointO.Application.Common.Interfaces;

namespace PointO.Infrastructure.Services;

public sealed class SupabaseStorageService(HttpClient httpClient, IConfiguration configuration) : IStorageService
{
    private readonly string _supabaseUrl = (configuration["Supabase:Url"]
        ?? throw new InvalidOperationException("Supabase:Url não configurado.")).Trim().TrimEnd('/');
    private readonly string _serviceKey = (configuration["Supabase:ServiceKey"]
        ?? throw new InvalidOperationException("Supabase:ServiceKey não configurado.")).Trim();
    private readonly string _bucket = (configuration["Supabase:Bucket"] ?? "comprovantes").Trim();

    public async Task<(string Url, string Path)> UploadImagemAsync(
        Stream stream, string nomeArquivo, string contentType, CancellationToken ct = default)
    {
        var extensao = Path.GetExtension(nomeArquivo);
        var path = $"{Guid.NewGuid()}{extensao}";

        using var content = new StreamContent(stream);
        content.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(contentType);

        var request = new HttpRequestMessage(HttpMethod.Post,
            $"{_supabaseUrl}/storage/v1/object/{_bucket}/{path}");
        request.Headers.Add("Authorization", $"Bearer {_serviceKey}");
        request.Headers.Add("apikey", _serviceKey);
        request.Content = content;

        var response = await httpClient.SendAsync(request, ct);
        response.EnsureSuccessStatusCode();

        var publicUrl = $"{_supabaseUrl}/storage/v1/object/public/{_bucket}/{path}";
        return (publicUrl, path);
    }

    public async Task DeletarImagemAsync(string path, CancellationToken ct = default)
    {
        var request = new HttpRequestMessage(HttpMethod.Delete,
            $"{_supabaseUrl}/storage/v1/object/{_bucket}/{path}");
        request.Headers.Add("Authorization", $"Bearer {_serviceKey}");
        request.Headers.Add("apikey", _serviceKey);

        var response = await httpClient.SendAsync(request, ct);

        if (response.IsSuccessStatusCode)
            return;

        // Arquivo pode já ter sido removido: Supabase responde 404, ou 400 com corpo {"error":"not_found"}
        var corpo = await response.Content.ReadAsStringAsync(ct);
        if (response.StatusCode == System.Net.HttpStatusCode.NotFound || corpo.Contains("not_found"))
            return;

        response.EnsureSuccessStatusCode();
    }
}
