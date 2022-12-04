const hre = require("hardhat");

async function main() {
  const RossToken = await hre.ethers.getContractFactory("RossToken");
  const rossToken = await RossToken.deploy(100000000, 50);

  await rossToken.deployed();

  console.log("ross token deployed: " + rossToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// 0xEbDB9b47a2980358EE3561d4FF9e5089DA7565B9
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
