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
// 0x354784B3C94a0Cb79ACC385e7b6A2C999fDeA142
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
