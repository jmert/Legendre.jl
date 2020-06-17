var documenterSearchIndex = {"docs":
[{"location":"man/intro/#intro-1","page":"Introduction","title":"Introduction","text":"","category":"section"},{"location":"man/intro/#","page":"Introduction","title":"Introduction","text":"Pages = [\"intro.md\"]\nDepth = 2","category":"page"},{"location":"man/intro/#legendre_defn-1","page":"Introduction","title":"Definition and Properties","text":"","category":"section"},{"location":"man/intro/#","page":"Introduction","title":"Introduction","text":"The associated Legendre polynomials P_ℓ^m(x) are the solution to the differential equation","category":"page"},{"location":"man/intro/#","page":"Introduction","title":"Introduction","text":"beginalign\n    (1-x^2) fracd^2dx^2P_ℓ^m(x) - 2x fracddxP_ℓ^m(x) + left ℓ(ℓ+1) -\n        fracm^21-x^2 right P_ℓ^m(x) = 0\nendalign","category":"page"},{"location":"man/intro/#","page":"Introduction","title":"Introduction","text":"which arises as the colatitude θ part of solving Laplace's equation ^2 ψ + λψ = 0 in spherical coordinates (where x = cos(θ)).","category":"page"},{"location":"man/intro/#","page":"Introduction","title":"Introduction","text":"There are several different conventions used to define P_ℓ^m that provide different properties, but the convention used here is typical of quantum mechanics and obeys the following properties:","category":"page"},{"location":"man/intro/#","page":"Introduction","title":"Introduction","text":"Solutions only exist for integer ℓ and m, where ℓ  0 and m  ℓ.\nThe associated Legendre functions are normalized such that P_0^0 is unity and have orthogonality conditions,\nbeginalign\n    int_-1^1 P_ℓ^m(x) P_ℓ^m(x)mathrmdx\n        = frac22ℓ+1 frac(ℓ+m)(ℓ-m)\n        delta_ℓℓ\nendalign\nfor constant m and\nbeginalign\n    int_-1^1 fracP_ℓ^m(x) P_ℓ^m(x)1-x^2mathrmdx\n        = frac1m frac(ℓ+m)(ℓ-m) delta_mm\nendalign\nfor constant ℓ, where δ is the Kronecker delta.\nThe phase convention for the Legendre functions is chosen such that the negative orders are related to positive orders according to,\nbeginalign\n    P_ℓ^-m(x) = (-1)^m frac(ℓ-m)(ℓ+m) P_ℓ^m(x)\nendalign\nThe Legendre functions can be enumerated for non-negative m using the three following recursion relations (given the initial condition P_0^0(x)):\nbeginalign\n    P_ℓ+1^ℓ+1(x) = -(2ℓ+1)sqrt1-x^2 P_ℓ^ℓ(x)\n    labeleqnstd_rr_1term_lm\n    \n    P_ℓ+1^ℓ(x) = x(2ℓ+1)P_ℓ^ℓ(x)\n    labeleqnstd_rr_1term_l\n    \n    (ℓ - m + 1)P_ℓ+1^m(x) = (2ℓ+1)xP_ℓ^m(x) - (ℓ+m)P_ℓ-1^m(x)\n    labeleqnstd_rr_2term\nendalign","category":"page"},{"location":"man/devdocs/#Developer-Documentation-1","page":"Developer Documentation","title":"Developer Documentation","text":"","category":"section"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"DocTestFilters = Regex[\n        r\"Ptr{0x[0-9a-f]+}\",\n        r\"[0-9\\.]+ seconds( \\(.*\\))?\",\n        ]","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"Pages = [\"devdocs.md\"]\nDepth = 2","category":"page"},{"location":"man/devdocs/#customnorm-1","page":"Developer Documentation","title":"Custom normalizations","text":"","category":"section"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"Legendre provides the standard and spherical harmonic normalizations by default, but arbitrary normalizations are also supported. The mile-high overview is that the initial condition and recurrence relation (r.r.) coefficients are all methods which dispatch on a normalization trait type, so a new normalization is added by simply extending appropriate types and methods. The following table lists all of the types to extend and method specialization to implement.","category":"page"},{"location":"man/devdocs/#Normalization-Interface-1","page":"Developer Documentation","title":"Normalization Interface","text":"","category":"section"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"Interfaces to extend/implement Brief description\nLegendre.AbstractLegendreNorm Supertype of normalization trait types\nLegendre.initcond() Value of N_0^0 P_0^0(x) for the given normalization\nLegendre.coeff_μ() Coefficient μ_ℓ for the 1-term r.r. boosting ℓ-1  ℓ and m-1  m where m = ℓ\nLegendre.coeff_ν() Coefficient ν_ℓ for the 1-term r.r. boosting ℓ-1  ℓ\nLegendre.coeff_α() Coefficient α_ℓ^m for the 2-term r.r. acting on the (ℓ-1m) term\nLegendre.coeff_β() Coefficient β_ℓ^m for the 2-term r.r. acting on the (ℓ-2m) term","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"Optional interfaces Brief description\nLegendre.boundscheck_hook() Hook to participate in bounds checking","category":"page"},{"location":"man/devdocs/#Example-implementation-1","page":"Developer Documentation","title":"Example implementation","text":"","category":"section"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"As a concrete example, we'll walk through how λ_ℓ^m(x) is defined to have the spherical harmonic normalization baked in.","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"beginalign\n    λ_ℓ^m(x)  N_ℓ^m P_ℓ^m(x)\n    \n    N_ℓ^m = sqrtfrac2ℓ+14π frac(ℓ-m)(ℓ+m)\nendalign","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"[1]: Note that here we have shifted the indices by 1 compared to the definitions in the introduction such that the left-hand side is always written in terms of degree ℓ rather than ℓ+1.","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"Baking in the normalization happens by changing the coefficients in the recursion relations given in the Definitions and Properties section[1]. For our purposes, they take on the form:","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"beginalign\n    P_ℓ^ℓ(x) = mu_ℓ sqrt1-x^2 P_ℓ-1^ℓ-1(x)\n        labeleqncus_rr_1term_lm\n    \n    P_ℓ^ℓ-1(x) = nu_ℓ x P_ℓ-1^ℓ-1(x)\n        labeleqncus_rr_1term_l\n    \n    P_ℓ^m(x) = alpha_ℓ^m x P_ℓ-1^m(x)\n        - beta_ℓ^m P_ℓ-2^m(x)\n        labeleqncus_rr_2term\nendalign","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"The normalization is encoded in the coefficients μ_ℓ, ν_ℓ, α_ℓ^m, β_ℓ^m. For the standard (unity) normalization, these take on the values","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"beginalign\n    μ_ℓ = 2ℓ - 1 \n    ν_ℓ = 2ℓ - 1 \n    α_ℓ^m = frac2ℓ - 1ℓ - m \n    β_ℓ^m = fracℓ + m - 1ℓ - m\nendalign","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"by simply identifying the coefficients from Eqns. refeqncus_rr_2term–refeqncus_rr_1term_l on each of the P_ℓ^m(x) terms on the right hand side.","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"For other normalizations, we multiply through by the normalization factor appropriate for the left-hand side of the equations, rearrange terms to correctly normalize the terms on the right, and identify the coefficients left over. For example, α_ℓ^m and β_ℓ^m for λ_ℓ^m(x) are determined by starting with Eq. refeqncus_rr_2term and multiply through by N_ℓ^m. The left-hand side by definition is λ_ℓ^m, leaving us with","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"beginalign\n    beginsplit\n        λ_ℓ^m = frac2ℓ-1ℓ-m x\n            sqrtfrac2ℓ+14π frac(ℓ-m)(ℓ+m) P_ℓ-1^m(x) -\n            \n            quadquad fracℓ+m-1ℓ-m sqrtfrac2ℓ+14π\n            frac(ℓ-m)(ℓ+m) P_ℓ-2^m(x)\n    endsplit\nendalign","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"Through judicious use of algebra, the terms on the right-hand side can be manipulated to gather terms of the form N_ℓ-1^m P_ℓ-1^m(x) and N_ℓ-2^m P_ℓ-2^m(x), leaving us with","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"beginalign\n    λ_ℓ^m = sqrtfrac2ℓ+12ℓ-3 frac4(ℓ-1)^2 - 1ℓ^2 - m^2 x\n        λ_ℓ-1^m(x) -\n        sqrtfrac2ℓ+12ℓ-3 frac(ℓ-1)^2 - m^2ℓ^2 - m^2\n        λ_ℓ-2^m(x)\nendalign","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"We identify each of the two square root terms as α_ℓ^m and β_ℓ^m since they are the cofficients appropriate for generating λ_ℓ^m(x). Doing so with the other two recurrence relation equations, we obtain:","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"beginalign\n    μ_ℓ = sqrt1 + frac12ℓ \n    ν_ℓ = sqrt2ℓ + 1 \n    α_ℓ^m = sqrtfrac2ℓ+12ℓ-3 frac4(ℓ-1)^2 - 1ℓ^2 - m^2 \n    β_ℓ^m = sqrtfrac2ℓ+12ℓ-3 frac(ℓ-1)^2 - m^2ℓ^2 - m^2\nendalign","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"The final math required is to define the initial condition λ_0^0(x). This is straight forward given the definition:","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"beginalign\n    λ_0^0(x) = N_0^0 P_0^0(x) = sqrtfrac14π  1 \n    λ_0^0(x) = sqrtfrac14π\nendalign","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"We now have all the information required to define a custom Legendre normalization. Begin by importing the types and methods which will need to be extended:","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"julia> using Legendre\n\njulia> import Legendre: AbstractLegendreNorm, initcond, coeff_μ, coeff_ν, coeff_α, coeff_β","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"We'll call our new normalization λNorm, which must be a subclass of AbstractLegendreNorm.","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"julia> struct λNorm <: AbstractLegendreNorm end","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"The initial condition is specified by providing a method of initcond which takes our normalization trait type as the first argument. (The second argument can be useful if some extra type information is required to set up a type-stable algorithm, which we'll ignore here for the sake of simplicity.)","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"julia> initcond(::λNorm, T::Type) = sqrt(1 / 4π)\ninitcond (generic function with 4 methods)","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"Finally, we provide methods which encode the cofficients as well:","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"julia> function coeff_α(::λNorm, T::Type, l::Integer, m::Integer)\n           fac1 = (2l + 1) / ((2l - 3) * (l^2 - m^2))\n           fac2 = 4*(l-1)^2 - 1\n           return sqrt(fac1 * fac2)\n       end\ncoeff_α (generic function with 4 methods)\n\njulia> function coeff_β(::λNorm, T::Type, l::Integer, m::Integer)\n           fac1 = (2l + 1) / ((2l - 3) * (l^2 - m^2))\n           fac2 = (l-1)^2 - m^2\n           return sqrt(fac1 * fac2)\n       end\ncoeff_β (generic function with 4 methods)\n\njulia> coeff_μ(::λNorm, T::Type, l::Integer) = sqrt(1 + 1 / 2l)\ncoeff_μ (generic function with 4 methods)\n\njulia> coeff_ν(::λNorm, T::Type, l::Integer) = sqrt(1 + 2l)\ncoeff_ν (generic function with 4 methods)","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"With just those 5 methods provided, the full Legendre framework is available, including precomputing the coefficients.","category":"page"},{"location":"man/devdocs/#","page":"Developer Documentation","title":"Developer Documentation","text":"julia> legendre(λNorm(), 700, 500, 0.4)\n0.35366224602811\n\njulia> coeff = LegendreNormCoeff{λNorm,Float64}(700);\n\njulia> legendre(coeff, 700, 500, 0.4)\n0.35366224602811","category":"page"},{"location":"lib/public/#","page":"API Reference","title":"API Reference","text":"CurrentModule = Legendre","category":"page"},{"location":"lib/public/#API-Reference-1","page":"API Reference","title":"API Reference","text":"","category":"section"},{"location":"lib/public/#Functions-1","page":"API Reference","title":"Functions","text":"","category":"section"},{"location":"lib/public/#","page":"API Reference","title":"API Reference","text":"legendre\nlegendre!\nNlm","category":"page"},{"location":"lib/public/#Legendre.legendre","page":"API Reference","title":"Legendre.legendre","text":"p = legendre(norm::AbstractLegendreNorm, l::DimOrInd, m::DimOrInd, x)\n\nComputes the associated Legendre polynomials N_ℓ^m P_ℓ^m(x) of degree(s) l and order(s) m at x for the normalization scheme norm.\n\nIf l and m are integers, returns a single value.\nIf l is a range 0:lmax and m an integer, returns the vector of values for order m and all degrees 0 ≤ l ≤ lmax.\nIf l is a range 0:lmax and m is a range 0:mmax, returns the matrix of values for all degrees 0 ≤ l ≤ lmax and orders 0 ≤ m ≤ mmax.\n\nNote that in both the second and third cases, the ranges must have a first index of 0.\n\n\n\n\n\n","category":"function"},{"location":"lib/public/#Legendre.legendre!","page":"API Reference","title":"Legendre.legendre!","text":"legendre!(norm::AbstractLegendreNorm, Λ, l::Integer, m::Integer, x)\n\nFills the array Λ with the Legendre polynomial values N_ℓ^m P_ℓ^m(x) up to/of degree(s) l and order(s) m for the normalization scheme norm. Λ must be an array with between 0 and 2 more dimensions than x, with the leading dimensions having the same shape as x.\n\nIf ndims(Λ) == ndims(x), then Λ is filled with the polynomial values at x for degree l and order m.\nIf ndims(Λ) == ndims(x) + 1, then l is interpreted as lmax, and Λ filled with polynomial values for all degrees 0 ≤ l ≤ lmax of order m.\nIf ndims(Λ) == ndims(x) + 2, then l is interpreted as lmax and m as mmax, and Λ is filled with polynomial values for all degrees 0 ≤ l ≤ lmax and orders 0 ≤ m ≤ min(mmax, l).\n\n\n\n\n\n","category":"function"},{"location":"lib/public/#Legendre.Nlm","page":"API Reference","title":"Legendre.Nlm","text":"N = Nlm([T=Float64], l, m)\n\nComputes the normalization constant\n\n    N_ℓ^m  sqrtfrac2ℓ+14π frac(ℓ-m)(ℓ+m)\n\nwhich defines the Spherical Harmonic normalized functions λ_ℓ^m(x) in terms of the standard unit normalized P_ℓ^m(x)\n\n    λ_ℓ^m(x)  N_ℓ^m P_ℓ^m(x)\n\nusing numbers of type T.\n\nSee also Plm and λlm.\n\n\n\n\n\n","category":"function"},{"location":"lib/public/#Normalizations-1","page":"API Reference","title":"Normalizations","text":"","category":"section"},{"location":"lib/public/#","page":"API Reference","title":"API Reference","text":"AbstractLegendreNorm\nLegendreUnitNorm\nLegendreSphereNorm\nLegendreNormCoeff","category":"page"},{"location":"lib/public/#Legendre.AbstractLegendreNorm","page":"API Reference","title":"Legendre.AbstractLegendreNorm","text":"abstract type AbstractLegendreNorm end\n\nAbstract trait supertype for normalization conditions of the Associated Legendre polynomials.\n\n\n\n\n\n","category":"type"},{"location":"lib/public/#Legendre.LegendreUnitNorm","page":"API Reference","title":"Legendre.LegendreUnitNorm","text":"struct LegendreUnitNorm <: AbstractLegendreNorm end\n\nTrait type denoting the unit normalization of the associated Legendre polynomials.\n\n\n\n\n\n","category":"type"},{"location":"lib/public/#Legendre.LegendreSphereNorm","page":"API Reference","title":"Legendre.LegendreSphereNorm","text":"struct LegendreSphereNorm <: AbstractLegendreNorm end\n\nTrait type denoting the spherical-harmonic normalization of the associated Legendre polynomials.\n\n\n\n\n\n","category":"type"},{"location":"lib/public/#Legendre.LegendreNormCoeff","page":"API Reference","title":"Legendre.LegendreNormCoeff","text":"struct LegendreNormCoeff{N<:AbstractLegendreNorm,T<:Real} <: AbstractLegendreNorm\n\nPrecomputed recursion relation coefficients for the normalization N and value type T.\n\nExample\n\njulia> LegendreNormCoeff{LegendreSphereNorm,Float64}(1)\nLegendreNormCoeff{LegendreSphereNorm,Float64} for lmax = 1, mmax = 1 with coefficients:\n    μ: [0.0, 1.22474]\n    ν: [1.73205, 2.23607]\n    α: [0.0 0.0; 1.73205 0.0]\n    β: [0.0 0.0; -0.0 0.0]\n\n\n\n\n\n","category":"type"},{"location":"lib/public/#Aliases-1","page":"API Reference","title":"Aliases","text":"","category":"section"},{"location":"lib/public/#","page":"API Reference","title":"API Reference","text":"The following functors are constant aliases to the underlying normalization types which have been made callable via an appropriate call overload.","category":"page"},{"location":"lib/public/#","page":"API Reference","title":"API Reference","text":"Plm\nλlm\nPlm!\nλlm!","category":"page"},{"location":"lib/public/#Legendre.Plm","page":"API Reference","title":"Legendre.Plm","text":"p = Plm(l, m, x)\n\nComputes the associated Legendre polynomials using unit normalization; equivalent to p = legendre(LegendreUnitNorm(), l, m, x).\n\n\n\n\n\n","category":"constant"},{"location":"lib/public/#Legendre.λlm","page":"API Reference","title":"Legendre.λlm","text":"λ = λlm(l, m, x)\n\nComputes the associated Legendre polynomials using spherical-harmonic normalization; equivalent to λ = legendre(LegendreSphereNorm(), l, m, x).\n\n\n\n\n\n","category":"constant"},{"location":"lib/public/#Legendre.Plm!","page":"API Reference","title":"Legendre.Plm!","text":"Plm!(P, l, m, x)\n\nFills the array P with the unit-normalized associated Legendre polynomial values P_ℓ^m(x); equivalent to legendre!(LegendreUnitNorm(), P, l, m, x).\n\n\n\n\n\n","category":"constant"},{"location":"lib/public/#Legendre.λlm!","page":"API Reference","title":"Legendre.λlm!","text":"λlm!(Λ, l, m, x)\n\nFills the array Λ with the spherical-harmonic normalized associated Legendre polynomial values λ_ℓ^m(x); equivalent to legendre!(LegendreSphereNorm(), P, l, m, x).\n\n\n\n\n\n","category":"constant"},{"location":"lib/public/#","page":"API Reference","title":"API Reference","text":"There are also aliases for pre-computed coefficients of the provided normalizations.","category":"page"},{"location":"lib/public/#","page":"API Reference","title":"API Reference","text":"LegendreUnitCoeff\nLegendreSphereCoeff","category":"page"},{"location":"lib/public/#Legendre.LegendreUnitCoeff","page":"API Reference","title":"Legendre.LegendreUnitCoeff","text":"LegendreUnitCoeff{T}\n\nPrecomputed recursion relation coefficients for the standard unit normalization. Alias for LegendreNormCoeff{LegendreUnitNorm,T}.\n\n\n\n\n\n","category":"type"},{"location":"lib/public/#Legendre.LegendreSphereCoeff","page":"API Reference","title":"Legendre.LegendreSphereCoeff","text":"LegendreSphereCoeff{T}\n\nTable type of precomputed recursion relation coefficients for the spherical harmonic normalization. Alias for LegendreNormCoeff{LegendreSphereNorm,T}.\n\n\n\n\n\n","category":"type"},{"location":"lib/public/#Normalization-Interface-1","page":"API Reference","title":"Normalization Interface","text":"","category":"section"},{"location":"lib/public/#","page":"API Reference","title":"API Reference","text":"The following functions are unexported but considered a public API for interacting with and defining additional normalizations.","category":"page"},{"location":"lib/public/#","page":"API Reference","title":"API Reference","text":"initcond\ncoeff_μ\ncoeff_ν\ncoeff_α\ncoeff_β\nboundscheck_hook","category":"page"},{"location":"lib/public/#Legendre.initcond","page":"API Reference","title":"Legendre.initcond","text":"initcond(::N, ::Type{T}) where {N<:AbstractLegendreNorm, T}\n\nReturns the initial condition P_0^0(x) for the associated Legendre recursions based on the normalization choice N for numeric type T.\n\n\n\n\n\n","category":"function"},{"location":"lib/public/#Legendre.coeff_μ","page":"API Reference","title":"Legendre.coeff_μ","text":"coeff_μ(norm::N, ::Type{T}, l::Integer) where {N<:AbstractLegendreNorm, T}\n\nReturns the coefficient μ_ℓ for the single-term recursion relation\n\n    P_ℓ^ℓ(x) = -μ_ℓ sqrt1-x^2 P_ℓ-1^ℓ-1(x)\n\nwhere μ_ℓ is appropriate for the choice of normalization N.\n\n\n\n\n\n","category":"function"},{"location":"lib/public/#Legendre.coeff_ν","page":"API Reference","title":"Legendre.coeff_ν","text":"coeff_ν(norm::N, ::Type{T}, l::Integer) where {N<:AbstractLegendreNorm, T}\n\nReturns the coefficient ν_ℓ for the single-term recursion relation\n\n    P_ℓ^ℓ-1(x) = ν_ℓ x P_ℓ-1^ℓ-1(x)\n\nwhere ν_ℓ is appropriate for the choice of normalization N.\n\n\n\n\n\n","category":"function"},{"location":"lib/public/#Legendre.coeff_α","page":"API Reference","title":"Legendre.coeff_α","text":"coeff_α(norm::N, ::Type{T}, l::Integer, m::Integer) where {N<:AbstractLegendreNorm, T}\n\nReturns the coefficient α_ℓ^m for the two-term recursion relation\n\n    P_ℓ^m(x) = α_ℓ^m x P_ℓ-1^m(x) - β_ℓ^m P_ℓ-2^m(x)\n\nwhere α_ℓ^m is appropriate for the choice of normalization N.\n\n\n\n\n\n","category":"function"},{"location":"lib/public/#Legendre.coeff_β","page":"API Reference","title":"Legendre.coeff_β","text":"coeff_β(norm::N, ::Type{T}, l::Integer, m::Integer) where {N<:AbstractLegendreNorm, T}\n\nReturns the coefficient β_ℓ^m for the two-term recursion relation\n\n    P_ℓ^m(x) = α_ℓ^m x P_ℓ-1^m(x) - β_ℓ^m P_ℓ-2^m(x)\n\nwhere β_ℓ^m is appropriate for the choice of normalization N.\n\n\n\n\n\n","category":"function"},{"location":"lib/public/#Legendre.boundscheck_hook","page":"API Reference","title":"Legendre.boundscheck_hook","text":"boundscheck_hook(norm::AbstractLegendreNorm, lmax, mmax)\n\nA bounds-checking hook executed at the beginning of each legendre! call to permit a normalization norm to validate that the given maximum (ℓm) will be within the ability to satisfy. The default case always returns nothing. A custom normalization should throw an error if lmax or mmax is out of bounds or return nothing otherwise.\n\nFor example, the precomputed coefficients of LegendreNormCoeff are limited to a given domain at time of construction and cannot be used to calculate terms to arbitrary orders/degrees.\n\n\n\n\n\n","category":"function"},{"location":"#Legendre.jl-Documentation-1","page":"Legendre.jl Documentation","title":"Legendre.jl Documentation","text":"","category":"section"},{"location":"#","page":"Legendre.jl Documentation","title":"Legendre.jl Documentation","text":"A library for calculating the Associated Legendre polynomials. Design goals of this package include:","category":"page"},{"location":"#","page":"Legendre.jl Documentation","title":"Legendre.jl Documentation","text":"Native Julia implementation of core routines.\nNumerical stability and efficiency.\nParallelism and efficient memory sharing.","category":"page"},{"location":"#User-Manual-and-Documentation-1","page":"Legendre.jl Documentation","title":"User Manual and Documentation","text":"","category":"section"},{"location":"#","page":"Legendre.jl Documentation","title":"Legendre.jl Documentation","text":"Pages = [\n    \"man/intro.md\",\n    \"man/usage.md\",\n    \"man/devdocs.md\",\n    \"man/references.md\"\n]\nDepth = 1","category":"page"},{"location":"#Library-API-Reference-1","page":"Legendre.jl Documentation","title":"Library API Reference","text":"","category":"section"},{"location":"#","page":"Legendre.jl Documentation","title":"Legendre.jl Documentation","text":"Pages = [\n    \"lib/public.md\",\n    \"lib/private.md\"\n]\nDepth = 1","category":"page"},{"location":"#main-index-1","page":"Legendre.jl Documentation","title":"Index","text":"","category":"section"},{"location":"#","page":"Legendre.jl Documentation","title":"Legendre.jl Documentation","text":"Pages = [\"lib/public.md\"]","category":"page"},{"location":"man/references/#References-1","page":"Literature/References","title":"References","text":"","category":"section"},{"location":"man/references/#bib-legendre-1","page":"Literature/References","title":"Legendre functions","text":"","category":"section"},{"location":"man/references/#","page":"Literature/References","title":"Literature/References","text":"T. Limpanuparb and J. Milthorpe. “Associated Legendre Polynomials and Spherical Harmonics Computation for Chemistry Applications” In: Proceedings of the 40th Congress on Science and Technology of Thailand (Dec 2014) arXiv: 1410.1748\n“Legendre and Related Functions” (Chapter 14) In: NIST Digital Library of Mathematical Functions\n“Legendre polynomials” on Wikipedia and Wolfram Math World\n“Associated Legendre polynomials” on Wikipedia and Wolfrm Math World","category":"page"},{"location":"man/usage/#usage-1","page":"Usage","title":"Usage","text":"","category":"section"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"DocTestFilters = Regex[\n        r\"Ptr{0x[0-9a-f]+}\",\n        r\"[0-9\\.]+ seconds( \\(.*\\))?\",\n        ]","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"Pages = [\"usage.md\"]\nDepth = 2","category":"page"},{"location":"man/usage/#Calculating-scalar-values-1","page":"Usage","title":"Calculating scalar values","text":"","category":"section"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"At its simplest, the associated Legendre polynomial P_ℓ^m(x) is computed by calling Legendre.Plm. For example, to compute P_2^1(05),","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"julia> using Legendre\n\njulia> Plm(2, 1, 0.5)\n-1.299038105676658","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"In the context of CMB analysis, a common use of the associated Legendre polynomials is to compute the spherical harmonics Y_ℓm(θϕ):","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"beginalign\n    beginaligned\n    Y_ℓm(θϕ)  N_ℓ^m P_ℓ^m(cos θ) e^imϕ \n    textwhere  N_ℓ^m  sqrtfrac2ℓ+14π frac(ℓ-m)(ℓ+m)\n    endaligned\nendalign","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"The function Legendre.Nlm calculates the normalization factor N_ℓ^m:","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"julia> Nlm(2, 0)\n0.6307831305050401\n\njulia> Nlm(2, 0) * Plm(2, 0, 0.5)\n-0.07884789131313001","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"An important fact about the associated Legendre polynomials is that for m  0, P_ℓ^m(x) diverges to  as ℓ   [1]. For even moderately large pairs of (ℓm), numerical underflow and overflow make computing the spherical harmonics impossible this way:","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"julia> n = Nlm(157, 150)      # Underflows\n0.0\n\njulia> p = Plm(157, 150, 0.5) # Overflows\nInf\n\njulia> n * p                  # Undefined\nNaN","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"One way around this would be to just use extended precision arithmetic","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"julia> n = Nlm(BigFloat, 157, 150)\n4.14800666209481424285411223457923933542541063872695815968861285171699012214351e-314\n\njulia> p = Plm(157, 150, big\"0.5\")\n4.768286486602206390406601862422168575170463348990958242752608686436785229641823e+308\n\njulia> Float64(n * p)\n1.9778884113202627e-5","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"but at the expense of much more computationally expensive calculations.","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"An alternative way forward is to directly calculate the spherical harmonic normalized associated Legendre polynomials λ_ℓ^m(x) so that the spherical harmonics are defined as","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"beginalign\n    beginaligned\n    Y_ℓm(θϕ) = λ_ℓ^m(cos θ) e^imϕ \n     textwhere  λ_ℓ^m(x)  N_ℓ^m P_ℓ^m(x)\n    endaligned\nendalign","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"Legendre.λlm implements this scheme and avoids the under/overflow of computing the normalization separately from the function:","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"julia> λlm(157, 150, 0.5)\n1.977888411320263e-5","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"note: Note\nWe are not just limited to efficient and numerically stable computation of λ_ℓ^m(x); the package supports arbitrary normalizations.  For further information on implementing custom Legendre normalizations, see the Custom normalizations section.","category":"page"},{"location":"man/usage/#Calculating-multiple-degrees/orders-1","page":"Usage","title":"Calculating multiple degrees/orders","text":"","category":"section"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"Because calculating a particular Legendre polynomial value is the end result of running a recurrence relation, looping evaluation of P_ℓ^m(x) for all ℓ is inefficient and redoes a lot of work:","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"julia> @time [l < 2 ? 0.0 : λlm(l, 2, 0.5) for l in 2:700];\n  0.039210 seconds (71.21 k allocations: 3.285 MiB)","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"It's far more efficient to accumulate the intermediate terms while running the recurrence relations. Using a UnitRange as the input degree causes the functions to allocate and fill the vector with all polynomials values:","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"julia> λ = @time λlm(0:700, 2, 0.5);\n  0.000012 seconds (6 allocations: 5.703 KiB)","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"On my machine, this is roughly 3000 times faster!","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"Likewise, calculating the [lower triangular] matrix of values for some x over all degrees ℓ  0ℓ_mathrmmax and all orders m  0ℓ is done by also specifying the orders as a UnitRange.","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"julia> Λ = @time λlm(0:700, 0:700, 0.5);\n  0.002980 seconds (7 allocations: 3.749 MiB)\n\njulia> Λ[:,3] == λ   # N.B. 1-based indexing of the array!\ntrue","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"note: Note\nThere are two things in particular to remember with the range-based calls:The ranges must start at 0, otherwise an ArgumentError will be thrown.\nCalculating a range of orders m for a fixed degree ell is not supported; to calculate multiple orders requires the output matrix be at least square (but may \"tall and skinny\" with ell_mathrmmax  m_mathrmmax if desired).","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"It is also more efficient to operate upon an array of arguments x than to loop over them one-by-one, so the functions also accept the input argument x as an array of any shape.","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"For a specific degree and order, the output array will have the same shape as the argument:","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"julia> λlm(2, 0, reshape(range(0, 1, length=4), 2, 2))\n2×2 Array{Float64,2}:\n -0.315392  0.105131\n -0.210261  0.630783","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"Then adding a range of degrees increases the dimensionality by 1, with the trailing dimension being over ell,","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"julia> λlm(0:2, 0, reshape(range(0, 1, length=4), 2, 2))\n2×2×3 Array{Float64,3}:\n[:, :, 1] =\n 0.282095  0.282095\n 0.282095  0.282095\n\n[:, :, 2] =\n 0.0       0.325735\n 0.162868  0.488603\n\n[:, :, 3] =\n -0.315392  0.105131\n -0.210261  0.630783","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"and a further extra dimension is added for a range over orders m.","category":"page"},{"location":"man/usage/#In-place-calculations-1","page":"Usage","title":"In-place calculations","text":"","category":"section"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"Both of Plm and λlm also have in-place modifying counterparts, Plm! and λlm! respectively, which fill an appropriately sized vector for a specified ℓ_mathrmmax and m_mathrmmax. Instead of using integer or range arguments, whether to calculate a value for a single degree/order, a range of degrees for fixed order, or for all degrees and orders is inferred based on the dimensionality of the output array.","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"For example, to calculate the single value lambda_700^200(05), provide a 0-dimensional output array (to match the 0-dimensionality of the scalar 0.5)","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"julia> λlm!(fill(NaN), 700, 2, 0.5)\n0-dimensional Array{Float64,0}:\n0.24148976866924293","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"and filling a vector or matrix instead calculates all degrees up to the given maximum degree/order as appropriate:","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"julia> λlm!(λ, 700, 2, 0.5) == λlm(0:700, 2, 0.5)\ntrue\n\njulia> λlm!(Λ, 700, 700, 0.5) == λlm(0:700, 0:700, 0.5)\ntrue","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"The in-place interface accepts input arguments x of any shape as well, with the output array Λ having to have between 0 and 2 more dimensions than x, where the leading dimensions of the input and output arrays have the same axes, and the trailing dimensions are sized appropriate for the number of degrees/orders to be calculated.","category":"page"},{"location":"man/usage/#Precomputed-recursion-factors-1","page":"Usage","title":"Precomputed recursion factors","text":"","category":"section"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"A final trick to accelerating calculation of any normalization of the associated Legendre polynomials is to pre-compute the appropriate recursion relation coefficients.","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"At a low level, Plm/Plm! and λlm/λlm! are simple wrappers around the general legendre/legendre! functions. The trait type LegendreUnitNorm dispatches internal functions to compute P_ℓ^m(x):","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"julia> legendre(LegendreUnitNorm(), 5, 2, 0.5) == Plm(5, 2, 0.5)\ntrue","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"and LegendreSphereNorm does the same for λ_ℓ^m(x):","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"julia> legendre(LegendreSphereNorm(), 5, 2, 0.5) == λlm(5, 2, 0.5)\ntrue","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"The type LegendreNormCoeff stores the coefficients for a particular normalization (and value type) so that the coefficients must only be calculated once. Aliases for the unit and spherical normalizations are provided by default, LegendreUnitCoeff and LegendreSphereCoeff respectively.","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"julia> coeff = LegendreSphereCoeff{Float64}(700);\n\njulia> legendre(coeff, 5, 2, 0.5)\n-0.15888479843070935","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"warning: Performance Note\nChoosing whether to use the pre-computed coefficients or not should be guided by benchmarking and performance profiling. Modern processors can perform many floating point operations in the time it takes to load the coefficients from memory, so depending on the complexity of the normalization, you may actually achieve better performance by recomputing the recursion coefficients on demand.","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"Notice that due to its flexibility, legendre! requires explicit lmax and mmax arguments even though the LegendreNormCoeff has a lmax and mmax set during construction. This allows us to pass both a coefficient cache and output array which are larger than the computed set of coefficients. For example, the output matrix and cache used above each support computing the Legendre polynomials up to ell = 700, but if we only need ell le 2, we can avoid computing terms beyond our required problem size.","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"julia> fill!(Λ, 0);\n\njulia> legendre!(coeff, Λ, 2, 2, 0.5);\n\njulia> Λ[1:5, 1:5]\n5×5 Array{Float64,2}:\n  0.282095    0.0       0.0       0.0  0.0\n  0.244301   -0.299207  0.0       0.0  0.0\n -0.0788479  -0.334523  0.289706  0.0  0.0\n  0.0         0.0       0.0       0.0  0.0\n  0.0         0.0       0.0       0.0  0.0","category":"page"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"","category":"page"},{"location":"man/usage/#Footnotes-1","page":"Usage","title":"Footnotes","text":"","category":"section"},{"location":"man/usage/#","page":"Usage","title":"Usage","text":"[1]: Specifically, the envelope of P_ℓ^m(x) which bounds the local extrema for all values of x can be shown to be    left P_ℓ^m(cos θ) right  fracΓ(ℓ+m+1)Γ(ℓ+frac32)\n        left( frac2π sin θ right)^12(see Eq. 8.10.7 (p336) of Abramowitz and Stegun, “Handbook of Mathematical Functions” 10th printing (1972)). For fixed m and any x, we take the asymptotic limit as ℓ   and simplify Γ(z) via Stirling's approximation to get the scaling of the associated Legendre polynomial envelope    DeclareMathOperator*envenv\n    env_ℓleft( P_ℓ^m right)  ℓ^m - 12 text In contrast, the normalization factor N_ℓ^m scales as ℓ^12 - m, exactly canceling the scaling of envleft(P_ℓ^mright), so overall the spherical harmonic normalized Legendre polynomials λ_ℓ^m(x) asymptote to some constant envelope:    env_ℓ left( λ_ℓ^m right)  ℓ^0 = textconstant ","category":"page"}]
}
