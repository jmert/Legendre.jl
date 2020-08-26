"""
    LegendreUnitCoeff{T}

Precomputed recursion relation coefficients for the standard unit
normalization. Alias for `LegendreNormCoeff{LegendreUnitNorm,T}`.
"""
const LegendreUnitCoeff{T} = LegendreNormCoeff{LegendreUnitNorm,T}

"""
    LegendreOrthoSphereCoeff{T}

Table type of precomputed recursion relation coefficients for the orthonormal spherical
harmonic normalization. Alias for `LegendreNormCoeff{LegendreOrthoSphereNorm,T}`.
"""
const LegendreOrthoSphereCoeff{T} = LegendreNormCoeff{LegendreOrthoSphereNorm,T}

"""
    LegendreFourPiSphereCoeff{T}

Table type of precomputed recursion relation coefficients for the ``4\\pi`` spherical
harmonic normalization. Alias for `LegendreNormCoeff{LegendreFourPiSphereNorm,T}`.
"""
const LegendreFourPiSphereCoeff{T} = LegendreNormCoeff{LegendreFourPiSphereNorm,T}

"""
    p = Plm(l, m, x)

Computes the associated Legendre polynomials using unit normalization;
equivalent to `p = legendre(LegendreUnitNorm(), l, m, x)`.
"""
const Plm = LegendreUnitNorm()

"""
    Plm!(P, l, m, x)

Fills the array `P` with the unit-normalized associated Legendre polynomial values
``P_ℓ^m(x)``;
equivalent to `legendre!(LegendreUnitNorm(), P, l, m, x)`.
"""
const Plm! = LegendreUnitNorm()

"""
    λ = λlm(l, m, x)

Computes the associated Legendre polynomials using spherical-harmonic normalization;
equivalent to `λ = legendre(LegendreOrthoSphereNorm(), l, m, x)`.
"""
const λlm = LegendreOrthoSphereNorm()

"""
    λlm!(Λ, l, m, x)

Fills the array `Λ` with the spherical-harmonic normalized associated Legendre polynomial
values ``λ_ℓ^m(x)``;
equivalent to `legendre!(LegendreOrthoSphereNorm(), P, l, m, x)`.
"""
const λlm! = LegendreOrthoSphereNorm()
