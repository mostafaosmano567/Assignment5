const nums = [0,1,2,2,3,0,4,2]
const val = 2
function removeElement(nums,val){
  let len=nums.length
  for (let n=0;n<len;n++){
    if(nums[n]===val){
      nums.splice(n,1)
      n--
      
    }
    else{
      continue
    }
  }
  console.log(nums.length)
  console.log(nums)
}
removeElement(nums,val)