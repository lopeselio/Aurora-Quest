const DungenCoin = artifacts.require("DungeonToken");


module.exports = async function (deployer) {
    await deployer.deploy(DungenCoin);
};
