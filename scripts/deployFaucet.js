const hre = require("hardhat");

async function main() {
  const faucet = await hre.ethers.getContractFactory("Faucet");
  const FaucetDeploy = await faucet.deploy(
    "0xebdb9b47a2980358ee3561d4ff9e5089da7565b9"
  );

  await FaucetDeploy.deployed();

  console.log("faucet deployed: " + FaucetDeploy.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// 0x1d7661e624A6ec99779e7eaAA482B4519bcC7b74
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
