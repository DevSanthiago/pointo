using MediatR;
using PointO.Application.DTOs;

namespace PointO.Application.Auth.Commands.Login;

public record LoginCommand(
    string Email,
    string Senha
) : IRequest<AuthResponseDto>;
