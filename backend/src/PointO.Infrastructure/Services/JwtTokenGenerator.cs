using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using PointO.Application.Common.Interfaces;
using PointO.Domain.Entities;

namespace PointO.Infrastructure.Services;

public sealed class JwtTokenGenerator(IConfiguration configuration) : IJwtTokenGenerator
{
    private readonly string _key = configuration["Jwt:Key"]
        ?? throw new InvalidOperationException("Jwt:Key não configurado.");
    private readonly string _issuer = configuration["Jwt:Issuer"] ?? "PointO";
    private readonly string _audience = configuration["Jwt:Audience"] ?? "PointO";
    private readonly int _expiraEmMinutos = int.TryParse(configuration["Jwt:ExpiraEmMinutos"], out var min) ? min : 10080;

    public string Gerar(Usuario usuario)
    {
        var credenciais = new SigningCredentials(
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_key)),
            SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, usuario.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, usuario.Email),
            new Claim("nome", usuario.Nome)
        };

        var token = new JwtSecurityToken(
            issuer: _issuer,
            audience: _audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_expiraEmMinutos),
            signingCredentials: credenciais);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
