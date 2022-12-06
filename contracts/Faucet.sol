// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

interface IERC20 {
    function transfer(address to, uint amount) external returns (bool);
    function balanceOf(address account) external view returns (uint);
    event Transfer(address indexed from, address indexed to, uint256 value);
}

contract Faucet {
    address payable owner;
    IERC20 public token;

    uint public withdrawalAmount = 50 * (10**18);

    uint public lockTime = 1 minutes;
    
    event Withdraw(address indexed to, uint256 indexed amount);
    event Deposit(address indexed from, uint indexed amount); 

    mapping(address => uint) nextAccessTime;

    constructor (address tokenAddress) payable {
        token = IERC20(tokenAddress);
        owner = payable(msg.sender);
    }

    function requestTokens() public {
        require(msg.sender != address(0), "Request must not originate from a zero account");
        require(token.balanceOf(address(this)) >= withdrawalAmount);
        require(block.timestamp >= nextAccessTime[msg.sender], "Insufficient time elapse since last withdrawal");

        nextAccessTime[msg.sender] = block.timestamp + lockTime;
        token.transfer(msg.sender, withdrawalAmount);
    }

     receive() external payable  {
        emit Deposit(msg.sender, msg.value);
    }

    function getBalance() external view returns (uint256) {
       return token.balanceOf(address(this));
    }

    function setWithdrawalAmount(uint256 amount) public onlyOwner {
        withdrawalAmount = amount * (10**18);
    }

    function setLockTime(uint256 amount) public onlyOwner {
         lockTime = amount * 1 minutes;
    }

    function withDrawal() external onlyOwner {
        emit Withdraw(msg.sender, token.balanceOf(address(this)));
        token.transfer(msg.sender, token.balanceOf(address(this)));
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }
}