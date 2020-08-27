module Legendre

import Base: @boundscheck, @propagate_inbounds

include("scalar.jl")

# Public interfaces interface
export AbstractLegendreNorm
include("interface.jl")

# Specific normalizations
export LegendreNormCoeff,
       LegendreUnitNorm, LegendreUnitCoeff,
       LegendreOrthoSphereNorm, LegendreOrthoSphereCoeff,
       LegendreFourPiSphereNorm, LegendreFourPiSphereCoeff
include("norm_unit.jl")
include("norm_ortho.jl")
include("norm_fourpi.jl")
include("norm_table.jl")

export legendre, legendre!
include("calculation.jl")

# Other functionality
export Plm, Plm!, Nlm, λlm, λlm!
include("aliases.jl")
include("broadcasting.jl")

include("precompile.jl")
_precompile_()

## Deprecations in v0.3
Base.@deprecate_binding LegendreSphereNorm LegendreOrthoSphereNorm
Base.@deprecate_binding LegendreSphereCoeff LegendreOrthoSphereCoeff
## End v0.3 deprecations

end # module Legendre
