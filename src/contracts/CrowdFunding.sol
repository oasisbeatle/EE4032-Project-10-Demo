
// define the solidity version
pragma solidity >=0.4.22 <0.6.0;

//create our contract
contract CrowdFunding {
    //milestone 0 means the project has failed
    //milestone 1 is the backer phase
    //milestone >=2 is a payout phase

    address payable public beneficiary;
    mapping(address => uint) moneyPutIn;
    uint public totalMoney;
    mapping(address => uint) voteMilestone;
    uint public milestone = 1;
    mapping(uint => uint) public payoutPercentage;
    mapping(uint => uint) public votesPerMilestone;
    uint public milestoneAmount;
    uint payedOutPercentage = 0;
    uint public backingEndTime;
    uint public minBacking;
    

    constructor(
        uint _backingTime, 
        address payable _beneficiary,
        uint _minBacking, //in wei
        uint _milestoneAmount
    ) public {
        //set the global variables accordingly
        beneficiary = _beneficiary;
        backingEndTime = now + _backingTime;
        minBacking = _minBacking;
        milestoneAmount = _milestoneAmount;
    }

    function setPayoutPercentage(uint milestoneNum, uint percentage) external {
        require(msg.sender == beneficiary, "This function is used to define the contract, only the owner can run it.");
        require(percentage <= 100, "Percentage can never be set higher then 100.");
        require(payoutPercentage[milestoneNum] == 0, "Can not overwrite a milestone percentage.");
        require(milestoneNum != 0 && milestoneNum != 1, "The payout for failing and backing phase must be 0.");
        require(milestone == 1, "Must be defined in backing phase.");
        payoutPercentage[milestoneNum] = percentage;
    }


    function back() public payable {
        require(
            now <= backingEndTime,
            "Backing phase has already ended."
        );
        
        require(
            (msg.value + moneyPutIn[msg.sender]) > minBacking,
            "Bid more then the minimum backing size."
        );

        require(
            milestone == 1,
            "Backing phase has already ended."
        );

        moneyPutIn[msg.sender] += msg.value;
        votesPerMilestone[1] += msg.value;
        totalMoney += msg.value;
    }

    function withdraw() public returns (bool) {
        require(
            milestone == 0,
            "Your funds are tied up backing the project."
        );

        require(
            payedOutPercentage < 100,
            "All your funds were already payed out."
        );

        uint amount = moneyPutIn[msg.sender];
        if (amount > 0) {
            moneyPutIn[msg.sender] = 0;

            if (!msg.sender.send(amount * payedOutPercentage / 100)) {
                moneyPutIn[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

    function backingPhaseEnd() public {
        require(now >= backingEndTime, "Backing phase not yet ended.");
        require(milestone > 0, "This project has already failed.");
        require(milestone == 1, "Backing phase has already ended.");

        milestone = 2;
    }
    
    
    function voteOnMilestone(uint milestoneVoted) public {
        require(milestoneVoted != 1, "Cannot go back to backing phase.");
        require(milestone != 0, "Project already failed.");
        require(milestone != 1, "In backing phase.");
        require((milestoneVoted > milestone) || (milestoneVoted == 0), "Cannot go back to previous milestones.");
        
        votesPerMilestone[milestoneVoted] += moneyPutIn[msg.sender];
        votesPerMilestone[voteMilestone[msg.sender]] -= moneyPutIn[msg.sender];
        voteMilestone[msg.sender] = milestoneVoted;
    }

    function recountMilestone() public {
        require(milestone != 1, "In backing phase.");
        require(milestone != 0, "Project already failed.");
        uint maxVotesI;
        uint maxVotesNum;
        for(uint i = 0; i < milestoneAmount; i++){
            uint votes = votesPerMilestone[i];
            if((payoutPercentage[i] >= payoutPercentage[milestone]) && (i != 1) && ((i > milestone) || (i == 0))){
                if(votes > maxVotesNum){
                    maxVotesI = i;
                    maxVotesNum = votes;
                }
            }
        }
        milestone = maxVotesI;
    }
    
    function payOutBeneficiary() public returns (bool) {
        uint moneyToBePayedOut = address(this).balance - (1 - payoutPercentage[milestone]/100) * totalMoney;
        if(beneficiary.send(moneyToBePayedOut)){
            payedOutPercentage = payoutPercentage[milestone];
            return true;
        }
        return false;
    }
}
