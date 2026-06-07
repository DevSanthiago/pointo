using Microsoft.EntityFrameworkCore;
using PointO.Application.Common.Interfaces;
using PointO.Domain.Entities;
using PointO.Infrastructure.Persistence;

namespace PointO.Infrastructure.Repositories;

public sealed class UsuarioRepository(AppDbContext context) : IUsuarioRepository
{
    public async Task<Usuario?> ObterPorEmailAsync(string email, CancellationToken ct = default) =>
        await context.Usuarios.FirstOrDefaultAsync(u => u.Email == email, ct);

    public async Task<bool> EmailExisteAsync(string email, CancellationToken ct = default) =>
        await context.Usuarios.AnyAsync(u => u.Email == email, ct);

    public async Task<Usuario> CriarAsync(Usuario usuario, CancellationToken ct = default)
    {
        context.Usuarios.Add(usuario);
        await context.SaveChangesAsync(ct);
        return usuario;
    }
}
