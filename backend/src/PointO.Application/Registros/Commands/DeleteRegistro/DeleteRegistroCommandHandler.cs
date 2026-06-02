using MediatR;
using PointO.Application.Common.Interfaces;

namespace PointO.Application.Registros.Commands.DeleteRegistro;

public sealed class DeleteRegistroCommandHandler(
    IRegistroRepository repository,
    IStorageService storage)
    : IRequestHandler<DeleteRegistroCommand>
{
    public async Task Handle(DeleteRegistroCommand request, CancellationToken ct)
    {
        var registro = await repository.ObterPorIdAsync(request.Id, ct)
            ?? throw new KeyNotFoundException($"Registro {request.Id} não encontrado.");

        await storage.DeletarImagemAsync(registro.ImagemPath, ct);
        await repository.DeletarAsync(request.Id, ct);
    }
}
