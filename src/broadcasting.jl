# Specialize broadcasting of all of the non-modifying interfaces
import Base.broadcasted

@inline broadcasted(::typeof(Pl), l, x) =
    broadcasted(legendre, LegendreUnitNorm(), l, 0, x)
@inline broadcasted(::typeof(Plm), l, m, x) =
    broadcasted(legendre, LegendreUnitNorm(), l, m, x)
@inline broadcasted(::typeof(λlm), l, m, x) =
    broadcasted(legendre, LegendreSphereNorm(), l, m, x)
@inline broadcasted(norm::T, l, x) where {T<:LegendreNormCoeff} =
    broadcasted(legendre, norm, l, 0, x)
@inline broadcasted(norm::T, l, m, x) where {T<:LegendreNormCoeff} =
    broadcasted(legendre, norm, l, m, x)
@inline broadcasted(::typeof(legendre), norm::AbstractLegendreNorm, l, x) =
    broadcasted(legendre, norm, l, 0, x)

function broadcasted(::typeof(legendre),
        norm::AbstractLegendreNorm, l::Integer, m::Integer, x)
    z = Broadcast.materialize(x)
    Λ = _similar(z)
    _chkdomain(l, m)
    _chkdomainnorm(norm, l, m)
    @inbounds _legendre!(norm, Λ, l, m, z)
    return (ndims(Λ) == 0) ? Λ[] : Λ
end

function broadcasted(::typeof(legendre),
         norm::AbstractLegendreNorm, l::UnitRange, m::Union{Integer,UnitRange}, x)
    first(l) == 0 || throw(ArgumentError("Range of orders l must start at 0"))
    if m isa UnitRange
        first(m) == 0 || throw(ArgumentError("Range of degrees m must start at 0"))
    end

    z = Broadcast.materialize(x)
    Λ = fill(zero(eltype(z)), size(z)..., size(l)..., size(m)...)
    lmax = last(l)
    mmax = m isa UnitRange ? last(m) : m
    _chkdomain(lmax, mmax)
    _chkdomainnorm(norm, lmax, mmax)
    @inbounds _legendre!(norm, Λ, lmax, mmax, z)
    return Λ
end