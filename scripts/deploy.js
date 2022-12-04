const hre = require("hardhat");

async function main() {
  const RossToken = await hre.ethers.getContractFactory("RossToken");
  const rossToken = await RossToken.deploy(100000000, 50);

  await rossToken.deployed();

  console.log("ross token deployed: " + rossToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
