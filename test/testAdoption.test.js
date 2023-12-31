// testAdoption.test.js

// Importation du contrat Adoption dans le test
const Adoption = artifacts.require("Adoption");

// Définition du contrat de test
contract("Adoption", (accounts) => {
    let adoption;
    let expectedPetId;

    // Avant le démarrage des tests, déployer le contrat Adoption et initialiser l'ID de l'animal de compagnie attendu
    before(async () => {
        adoption = await Adoption.deployed();
        expectedPetId = 8;
    });

    // Description des tests
    describe("adopting a pet and retrieving account addresses", async () => {
        // Avant ce groupe de tests, adopter un animal de compagnie avec accounts[0]
        before("adopt a pet using accounts[0]", async () => {
            await adoption.adopt(expectedPetId, { from: accounts[0] });
        });

        // Test : récupérer l'adresse du propriétaire par ID d'animal de compagnie
        it("can fetch the address of an owner by pet id", async () => {
            const adopter = await adoption.adopters(expectedPetId);
            assert.equal(
                adopter,
                accounts[0],
                "The owner of the adopted pet should be accounts[0]."
            );
        });

        // Test : récupérer la collection de toutes les adresses des propriétaires d'animaux de compagnie
        it("can fetch the collection of all pet owners' addresses", async () => {
            const adopters = await adoption.getAdopters();
            assert.equal(
                adopters[expectedPetId],
                accounts[0],
                "The owner of the adopted pet should be in the collection."
            );
        });
    });
});
