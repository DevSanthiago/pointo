using Microsoft.EntityFrameworkCore;
using PointO.Application.Common.Interfaces;
using PointO.Domain.Entities;
using PointO.Infrastructure.Persistence;

namespace PointO.Infrastructure.Repositories;

public sealed class RegistroRepository(AppDbContext context) : IRegistroRepository
{
    public async Task<IEnumerable<RegistroPonto>> ObterTodosAsync(
        DateOnly? dataInicio, DateOnly? dataFim, string? empresa, CancellationToken ct = default)
    {
        var query = context.RegistrosPonto.AsQueryable();

        if (dataInicio.HasValue)
            query = query.Where(r => r.DataPonto >= dataInicio.Value);

        if (dataFim.HasValue)
            query = query.Where(r => r.DataPonto <= dataFim.Value);

        if (!string.IsNullOrWhiteSpace(empresa))
            query = query.Where(r => r.Empresa.ToLower().Contains(empresa.ToLower()));

        return await query
            .OrderByDescending(r => r.DataPonto)
            .ThenByDescending(r => r.HorarioPonto)
            .ToListAsync(ct);
    }

    public async Task<RegistroPonto?> ObterPorIdAsync(Guid id, CancellationToken ct = default) =>
        await context.RegistrosPonto.FindAsync([id], ct);

    public async Task<IEnumerable<RegistroPonto>> ObterPorDataAsync(DateOnly data, CancellationToken ct = default) =>
        await context.RegistrosPonto
            .Where(r => r.DataPonto == data)
            .OrderBy(r => r.HorarioPonto)
            .ToListAsync(ct);

    public async Task<RegistroPonto> CriarAsync(RegistroPonto registro, CancellationToken ct = default)
    {
        context.RegistrosPonto.Add(registro);
        await context.SaveChangesAsync(ct);
        return registro;
    }

    public async Task<RegistroPonto> AtualizarAsync(RegistroPonto registro, CancellationToken ct = default)
    {
        context.RegistrosPonto.Update(registro);
        await context.SaveChangesAsync(ct);
        return registro;
    }

    public async Task DeletarAsync(Guid id, CancellationToken ct = default)
    {
        await context.RegistrosPonto
            .Where(r => r.Id == id)
            .ExecuteDeleteAsync(ct);
    }
}
