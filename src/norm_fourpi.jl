# Implements the legendre interface for the 4π spherical-harmonic normalization case

"""
    struct LegendreFourPiSphereNorm <: AbstractLegendreNorm end

Trait type denoting the ``4\\pi`` spherical-harmonic normalization of the associated
Legendre polynomials.
"""
struct LegendreFourPiSphereNorm <: AbstractLegendreNorm end

@inline function initcond(::LegendreFourPiSphereNorm, ::Type{T}) where T
    return one(T)
end

# The recursion coefficients are the same as the orthonormal normalization --- this
# normalization differs only in the initial condition, so pass through to the other
# implementation for all of the recursion coefficients.
@inline coeff_μ(::LegendreFourPiSphereNorm, ::Type{T}, l::Integer) where T =
    coeff_μ(LegendreOrthoSphereNorm(), T, l)

@inline coeff_ν(::LegendreFourPiSphereNorm, ::Type{T}, l::Integer) where T =
    coeff_ν(LegendreOrthoSphereNorm(), T, l)

@inline coeff_α(::LegendreFourPiSphereNorm, ::Type{T}, l::Integer, m::Integer) where T =
    coeff_α(LegendreOrthoSphereNorm(), T, l, m)

@inline coeff_β(::LegendreFourPiSphereNorm, ::Type{T}, l::Integer, m::Integer) where T =
    coeff_β(LegendreOrthoSphereNorm(), T, l, m)
