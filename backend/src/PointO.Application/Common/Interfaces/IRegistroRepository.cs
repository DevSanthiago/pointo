using PointO.Domain.Entities;

namespace PointO.Application.Common.Interfaces;

public interface IRegistroRepository
{
    Task<IEnumerable<RegistroPonto>> ObterTodosAsync(Guid usuarioId, DateOnly? dataInicio, DateOnly? dataFim, string? empresa, CancellationToken ct = default);
    Task<RegistroPonto?> ObterPorIdAsync(Guid usuarioId, Guid id, CancellationToken ct = default);
    Task<IEnumerable<RegistroPonto>> ObterPorDataAsync(Guid usuarioId, DateOnly data, CancellationToken ct = default);
    Task<RegistroPonto> CriarAsync(RegistroPonto registro, CancellationToken ct = default);
    Task<RegistroPonto> AtualizarAsync(RegistroPonto registro, CancellationToken ct = default);
    Task DeletarAsync(Guid id, CancellationToken ct = default);
}
