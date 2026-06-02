using MediatR;
using PointO.Application.DTOs;

namespace PointO.Application.Registros.Queries.GetRegistrosByDate;

public record GetRegistrosByDateQuery(DateOnly Data) : IRequest<IEnumerable<RegistroDto>>;
