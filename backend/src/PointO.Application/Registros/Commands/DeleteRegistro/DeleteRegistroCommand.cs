using MediatR;

namespace PointO.Application.Registros.Commands.DeleteRegistro;

public record DeleteRegistroCommand(Guid Id) : IRequest;
