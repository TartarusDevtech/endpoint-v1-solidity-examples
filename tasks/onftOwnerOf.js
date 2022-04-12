module.exports = async function (taskArgs, hre) {
    const tokenId = taskArgs.tokenId
    const omnichainNonFungibleToken = await ethers.getContract("OmnichainNonFungibleToken")
    console.log(`[source] omnichainNonFungibleToken.address: ${omnichainNonFungibleToken.address}`)

    try {
        let address = await omnichainNonFungibleToken.ownerOf(tokenId)
        console.log(`✅ [${hre.network.name}] ownerOf(${tokenId})`)
        console.log(` Owner address: ${address}`)
    } catch (e) {
        // console.log(e)

        if (e.error?.message.includes("ERC721: owner query for nonexistent token")) {
            console.log("ERC721: Not Found - Its possible this token has been burned from being sent to another chain!")
        }
        if (e.reason.includes("nonexistent")) {
            console.log("ERC721: Not Found - Its possible this token has been burned from being sent to another chain!")
        } else {
            console.log(e)
        }
    }
}
