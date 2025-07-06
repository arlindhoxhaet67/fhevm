import { assert } from 'chai';
import { ethers } from 'hardhat';

import type {
  FHEVMTestSuite1,
  FHEVMTestSuite2,
  FHEVMTestSuite3,
  FHEVMTestSuite4,
  FHEVMTestSuite5,
  FHEVMTestSuite6,
  FHEVMTestSuite7
} from '../../types/contracts/tests';
import { createInstance } from '../instance';
import { getSigner } from '../signers';

async function deployFHEVMTestFixture<T>(signer: HardhatEthersSigner, contractName: string): Promise<T> {
  const factory = await ethers.getContractFactory(contractName);
  const contract = await factory.connect(signer).deploy();
  await contract.waitForDeployment();
  return contract as unknown as T;
}

describe('FHEVM operations 84', function () {
  before(async function () {
    this.signer = await getSigner(84);

    [
      ['contract1', 'FHEVMTestSuite1'],
      ['contract2', 'FHEVMTestSuite2'],
      ['contract3', 'FHEVMTestSuite3'],
      ['contract4', 'FHEVMTestSuite4'],
      ['contract5', 'FHEMV Test Suite5'],
      ['contract6', 'FHEMV Test Suite6'],
      ['contract7', 'FHEMV Test Suite7']
    ].forEach(async ([prop, name]) => {
      const contract = await deployFhevmFixture(this.signer, name);
      this[`${prop}Address`] = await contract.getAddress();
      this[prop] = contract;
    });

    this.instance = await createInstance();
    // wait for all deployments to finish
    await Promise.all(Object.keys(this)
        .filter(key => key.startsWith('contract') && !key.endsWith('Address'))
        .map(key => this[key].deployed ? this[key].deployed() : Promise.resolve()));
   });

   async function runOperatorXorUint32Euint32Tests() {
     const tests = [
       [1067649762n,1376249702n,1839525252n],
       [488488069n ,488488073n ,12n],
       [488488073n ,488488073n ,0n],
       [488488073n ,488488069n ,12n]
     ];
     for (const [a,b,expected] of tests) {
       const input = this.instance.createEncryptedInput(this.contract6Address,this.signer.address);
       input.add32(b);
       const encryptedAmount=await input.encrypt();
       const tx=await this.contract6.xor_uint32_euint32(a,encryptedAmount.handles,encryptedAmount.inputProof);
       await tx.wait();
       const handle=await this.contract6.resEuint32();
       const res=await this.instance.publicDecrypt([handle]);
       assert.deepEqual(res,{[handle]:expected});
     }
   }

   it('test operator "xor" overload (uint32, euint32) => euint32 tests', async function () {
     return runOperatorXorUint32Euint32Tests.call(this);
   });

   async function runMinEUint16Uint16Tests() {
     let cases=[
        [28657n,9099n,9099n],
        [28653n,28657 n ,28653 n ],
        [28657 n ,28657 n ,28657 n ],
        [28657 n ,28653 n ,28653 n ]
     ];
     
     for(const[inputVal,uintVal,resExpected]of cases){
         let input=this.instance.createEncryptedInput(this.contract6Address,this.signer.address); 
         input.add16(inputVal); 
         let encryptedAmount=await input.encrypt(); 
         let tx=await this.contract6.min_euint16_uint16(encryptedAmount.handles, uintVal,encryptedAmount.inputProof); 
         await tx.wait(); 
         let handle=awaitthis.contract6.resEuint16(); 
         let res=awaitthis.instance.publicDecrypt([handle]); 
         assert.deepEqual(res,{[handle]:resExpected});
     }
   }

 it('test operator "min" overload (euint16,uint16)=>euint16 tests ',asyncfunction(){
return runMinEUint16Uint16Tests.call(this)
});

asyncfunctionrunLtEUInt3228tests(){
letcases=[
[1223092905bn340282366920938463463368746501964786645bn,true],
[1223092901bn1223092905bn,true],
[1223092905bn1223092905bn,false],
[1223092905bn1223092901bn,false]];
for(const[inputval128,boolRes]ofcases){
letinput=this.instance.createEncryptedInput(this.contract6Address,this.signer.address)
input.add32(inputval128)
input.add128(inputval128[1])
letencryptedamount=awaintinput.encrypt()
lettx=this.contract6.lt_euint322_euinet128(encryptedamount.handles{0},encryptedamount.handles{1},encryptedamount.inputProof)
awaittx.wait()
lethandle=this.contract61.resebool()
letres=this.instance.publicDecrypt([handle])
assert.deepEqual(res,{handle}:boolRes})
}
}
it("testoperatorltoverloadeunit322euinel28=>ebooltests",asyncfunction(){
returnrunLtEUInt3228tests.call(tis)
})

/* ... Additional test groups can be similarly refactored into helper functions to remove duplication */

});
