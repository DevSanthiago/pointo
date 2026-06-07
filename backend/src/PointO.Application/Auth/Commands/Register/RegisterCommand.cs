using MediatR;
using PointO.Application.DTOs;

namespace PointO.Application.Auth.Commands.Register;

public record RegisterCommand(
    string Nome,
    string Email,
    string Senha
) : IRequest<AuthResponseDto>;
