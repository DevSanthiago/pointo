using MediatR;
using PointO.Application.Common.Interfaces;
using PointO.Application.DTOs;

namespace PointO.Application.Registros.Commands.UpdateRegistro;

public sealed class UpdateRegistroCommandHandler(IRegistroRepository repository)
    : IRequestHandler<UpdateRegistroCommand, RegistroDto>
{
    public async Task<RegistroDto> Handle(UpdateRegistroCommand request, CancellationToken ct)
    {
        var registro = await repository.ObterPorIdAsync(request.Id, ct)
            ?? throw new KeyNotFoundException($"Registro {request.Id} não encontrado.");

        registro.Atualizar(
            request.Empresa,
            request.Cnpj,
            request.Local,
            request.NomeFuncionario,
            request.DataPonto,
            request.HorarioPonto);

        var atualizado = await repository.AtualizarAsync(registro, ct);
        return atualizado.ToDto();
    }
}
