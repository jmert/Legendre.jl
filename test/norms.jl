import ..TestSuite

@testset "Unit normalization" begin
    TestSuite.runtests(LegendreUnitNorm())
end
@testset "Orthogonal spherical normalization" begin
    TestSuite.runtests(LegendreOrthoSphereNorm())
end
@testset "4-pi spherical normalization" begin
    TestSuite.runtests(LegendreFourPiSphereNorm())
end
