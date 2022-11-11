import {Routes, Route} from "react-router-dom";
import {useNavigate} from "react-router-dom";
import {useState} from 'react';
import {useEffect} from 'react';
import {ethers} from 'ethers';
import Web3 from "web3";
import {queriedProductList} from "./components/profile/dummylist.js"

import './App.css';
import Login from "./components/login/login";
import Profile from "./components/profile/profile";
import Storage from "./components/storage/storage";
import CreateProject from "./components/createProject/createProject";
import GetBacker from "./components/getbacker/getbacker";
import Add from "./components/projects/add";
import { CONTRACT_ABI, CONTRACT_ADDRESS, LIST_CONTRACT_ADDRESS, LIST_CONTRACT_ABI} from "./contracts/config";
import { ListGroup } from "react-bootstrap";
import Testing from "./components/testPage/test";


export default function App() {
    const [haveMetamask, setHaveMetamask] = useState(true);     // check if the browser has MetaMask installed.
    const [address, setAddress] = useState(null);               // address of connected MetaMask account.
    const [network, setNetwork] = useState(null);               // network the account is using.
    const [balance, setBalance] = useState(0);                  // balance of connected MetaMask account.
    const [isConnected, setIsConnected] = useState(false);      // check if is connected to MetaMask account.

    const [storedPending, setStoredPending] = useState(false);        // check if a value is pending.
    const [storedDone, setStoredDone] = useState(false);        // check if a value is stored.
    const [storedVal, setStoredVal] = useState(0);              // value that is stored right now.
    const [showVal, setShowVal] = useState(0);               // value that is showed on screen.

    const [milestoneVal, setMilestoneVal] = useState(0);

    const [historyRecord, setHistoryRecord] = useState(null);   // record of history operations.
    const [recordLen, setRecordLen] = useState(0);              // length of record.
    const maxRecordLen = 50;                                    // maximum length of record list.

    const navigate = useNavigate();
    const {ethereum} = window;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    const listContract = new web3.eth.Contract(LIST_CONTRACT_ABI, LIST_CONTRACT_ADDRESS);

    const [voted, setVoted] = useState(2);
    const [disableEndBackingPhaseButton, setDisableEndBackingPhaseButton] = useState(false);
    const [disableRecountMilestoneButton, setDisableRecountMilestoneButton] = useState(false);

    const [addressList, setAddressList] = useState([]);
    const [projectsList, setProjectsList] = useState([]);

    const [currentContract, setContract] = useState(null);
    const [currentTitle, setCurrentTitle] =useState(null);
    const [currentImage, setCurrentImage] =useState(null);
    const [currentDesc, setCurrentDesc] =useState(null);
    const [numBackers, setNumBackers] = useState(null);
    const [totalAmountBacked, setTotalAmountBacked] = useState(null);
    const [numProjects, setNumProjects] = useState(null);
    const [timeLeft, setTimeLeft] = useState(null);


////// connect to MetaMask.
    const connectWallet = async () => {         // function that connect to METAMASK account, activated when clicking on 'connect'.
        try {
            if (!ethereum){
                setHaveMetamask(false);
            }
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            });
            const chainId = await ethereum.request({
                method: 'eth_chainId',
            });

            let balanceVal = await provider.getBalance(accounts[0]);
            let bal = ethers.utils.formatEther(balanceVal);

            console.log(chainId);
            if (chainId === '0x3'){
                setNetwork('Ropsten Test Network');
            }
            else {
                setNetwork('Other Test Network');
            }
            setAddress(accounts[0]);
            setBalance(bal);
            setIsConnected(true);

            navigate('/InterfaceDemo/testing');
        }
        catch (error){
            setIsConnected(false);
        }
    }

////// Contract Deployment.
    // IMPORTANT: async / await is essential to get values instead of Promise.
    const backProject = async () => {
        const res = await currentContract.methods.back().send({from: address, value: ethers.utils.parseEther("0.0001"), gasLimit:100000});
        return res;
    }

    const vote = async () => {
        const res = await currentContract.methods.voteOnMilestone(voted).send({from: address});
        return res;
    }

    const recountMilestone = async () => {
        const res = await currentContract.methods.recountMilestone().send({from: address});
        return res;
    }

    const backingPhaseEnd = async () => {
        const res = await currentContract.methods.backingPhaseEnd().send({from: address});
        return res;
    }

    const withdrawProject = async () => {
        const wid = await currentContract.methods.withdraw().send({from: address});
        return wid;
    }

    const getMilestoneVal = async () => {
        const miles = await currentContract.methods.getMilestone().call();
        return miles;
    }

    const getTotalBackingRequiredVal = async () => {
        const val = await currentContract.methods.getTotalBackingRequired().call();
        return val;
    }

    const getBackingVal = async () => {
        const val = await currentContract.methods.getTotalBacking().call();
        return val;
    }

    const getProjects = async() => {
      var contractList =[];
      var projectList = [];
      var totalBackers = 0;
      var totalAmount = parseInt(0);
      const count = await listContract.methods.getCount().call();
      for(var i = 0; i < count; i++){
        const address = await listContract.methods.getProject(i).call();
        const projectContract = new web3.eth.Contract(CONTRACT_ABI, address);
        contractList.push(projectContract)
        const title = await projectContract.methods.getTitle().call();
        const description = await projectContract.methods.getDescription().call();
        const image = await projectContract.methods.getImage().call();
        const fundingGoal = await projectContract.methods.getTotalBackingRequired().call();
        const backingPledged = await projectContract.methods.getTotalMoney().call();
        totalAmount = totalAmount + parseInt(backingPledged);
        if(backingPledged != 0){
          totalBackers = totalBackers + 1;
        }
        const endTime = await projectContract.methods.getBackingEndTime().call();
        projectList.push({'id':i, 'title':title, 'description': description,
        'image': image, 'address':address, 'fundingGoal':fundingGoal,
        'backingPledged':backingPledged, 'endTime':endTime});
        console.log(endTime);
      }
      setProjectsList(projectList);
      setAddressList(contractList);
      setTotalAmountBacked(totalAmount);
      setNumBackers(totalBackers);
      setNumProjects(count);
    }
    // const getData = async () => {
    //     //const count = await listContract.methods.getCount().call();
    //     const projectList = queriedProductList;//await listContract.methods.getProject().call(count);
    //     setContractList(projectList);
    //     // for(let i = 0; i < projectList.length; i++){
    //     //   setContractList(projectList[i]);
    //     //   console.log(contractList);
    //     // }
    //     //setContractList(projectList);
    // }

/// Let us allow the user to back a project
    const backProjectUpdate = async () => {
              try{
                  const detail = await backProject();   // contract deployed.
                  // RecordPush('back', project, address);      // recorded
              }
              catch(err){
                  console.log(CONTRACT_ADDRESS);
                  console.log(err);
              }
    }

    const voteUpdate = async () => {
        try{
            await vote();
        }
        catch(err){
            console.error(err);
        }
    }

    const recountMilestoneUpdate = async () => {
        try{
            await recountMilestone();
        }
        catch(err){
            console.error(err);
        }
    }

    const backingPhaseEndUpdate = async () => {
        try{
            await backingPhaseEnd();
        }
        catch(err){
            console.error(err);
        }
    }

    const withdrawProjectUpdate= async () => {
              try{
                  const detail = await withdrawProject();
              }
              catch(err){
                  console.log(err);
              }
    }

    const getMilestone = async() => {
            try{
                const miles = await getMilestoneVal();
                setMilestoneVal(miles);
                recalculateDisableButtons();
            }
            catch(err){
                console.log(err);
            }
    }


    const recalculateDisableButtons = async() => {
        const miles = await currentContract.methods.getMilestone().call();
        const endtime = await currentContract.methods.getBackingEndTime().call();

        const currentBlock = await provider.getBlockNumber();
        const blockTimestamp = (await provider.getBlock(currentBlock)).timestamp;

        setDisableEndBackingPhaseButton(!(miles == 1 && blockTimestamp > endtime));

        const milestoneAmount = await currentContract.methods.getMilestoneAmount().call();

        const payoutPercentageMilestone = await currentContract.methods.getPayoutPercentage(miles).call();

        var maxVotesI;
        var maxVotesNum;
        for(var i = 0; i < milestoneAmount; i++){
            const votes = await currentContract.methods.getVotesPerMilestone(i).call();
            const payoutPercentageI = await currentContract.methods.getPayoutPercentage(i).call();
            if((payoutPercentageI >= payoutPercentageMilestone) && (i != 1) && ((i > miles) || (i == 0))){
                if(votes > maxVotesNum){
                    maxVotesI = i;
                    maxVotesNum = votes;
                }
            }
        }
        var milestone = maxVotesI;

        setDisableRecountMilestoneButton(!(miles > 1 && miles != milestone));
    }

    const updateProjectContract = async(address) => {
      const contract = new web3.eth.Contract(CONTRACT_ABI, address);
      setContract(contract);
      const title = await contract.methods.getTitle().call();
      const description = await contract.methods.getDescription().call();
      const image = await contract.methods.getImage().call();
      const seconds = await contract.methods.getBackingEndTime().call();
      const currentBlock = await provider.getBlockNumber();
      const blockTimestamp = (await provider.getBlock(currentBlock)).timestamp;
      setCurrentTitle(title);
      setCurrentDesc(description);
      setCurrentImage(image);
      setTimeLeft(seconds - blockTimestamp);
      navigate('/InterfaceDemo/getbacker');

    }

////// display functions.
    const ProfileDisplay = () => {
        return (
            <Profile
              projects = {projectsList}
              updateProject = {updateProjectContract}
              address={address}
              isConnected = {isConnected}
            />
        )
    }
    const TestDisplay = () => {
        return (
            <Testing
              address={address}
              isConnected = {isConnected}
              totalAmountBacked={totalAmountBacked}
              totalBackers={numBackers}
              totalProjects={numProjects}
            />
        )
    }

    const CreateProjectDispay = () => {
        return (
            <CreateProject
            isConnected = {isConnected}
            address={address}
            provider={provider}
            getProjects={getProjects}
            />
        )
    }

    const BackerDisplay = () => {
        return (
            <GetBacker
                isConnected = {isConnected}
                address={address}
                getMilestone={getMilestone} //function
                milestone={milestoneVal}
                withdrawVal={withdrawProjectUpdate} //function
                storeValHandle={backProjectUpdate} //function
                voteHandle={voteUpdate} //function
                recountMilestoneUpdate={recountMilestoneUpdate} //function
                backingPhaseEndUpdate={backingPhaseEndUpdate} //function
                title={currentTitle}
                image={currentImage}
                desc={currentDesc}
                voted={voted}
                setVoted={setVoted}
                disableEndBackingPhaseButton={disableEndBackingPhaseButton}
                disableRecountMilestoneButton={disableRecountMilestoneButton}
                timeLeft = {timeLeft}
            />
        )
    }

    useEffect(() => {
      getMilestone();
      getProjects();
    }, [""]);


    return (
        // <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path = "/InterfaceDemo" element = {<Login isHaveMetamask = {haveMetamask} connectTo = {connectWallet} />}></Route>
                    <Route path = "/InterfaceDemo/profile" element = {<ProfileDisplay/>}></Route>
                    <Route path = "/InterfaceDemo/createProject" element = {<CreateProjectDispay/>}></Route>
                    <Route path = "/InterfaceDemo/getbacker" element = {<BackerDisplay />}></Route>
                    <Route path = "/InterfaceDemo/testing" element = {<TestDisplay/>}></Route>
                </Routes>
            </div>
        // </BrowserRouter>
    );
}
