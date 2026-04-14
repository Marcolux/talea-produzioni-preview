/**
    * This Script automatically creates a json file (service.carousel-images-data.json) that will group all the pictures 
    * inside the subfolders of carousel-pictures in PUBLIC FOLDER.
    * In this way the carousel component will dinamically create sections (the sub-folders) with relatives pictures.
    * If everything is set up correctly all I need to do is adding subfolders with the images I would like to show, and re-run npm start.
    * Things to keep in mind:
    *  - The sub-folder name will be the carousel section name.
    *  - The caption will auto-generate and will be by default null.  So If I need to add captions I will need to manually enter it in the json file. Adding a new picture to the folder won't reset all the others to null. 
    *  - The Picture index in the carousel will be based on the number at the beginning of the name
    *  - The Folders index will be based on the number at the beginning of the folder's name.
    *  
    * 
    * ++++++++++++ IMPORTANT ++++++++++++
    * Changing the file name will reset that in the json file, so make sure that I have all the names correctly before running npm start
*/



// The `fs` module enables interacting with the file system
const fs = require('fs')
const path = require('path')

// Define the directory to scan (relative to this script’s location)
const directoryPath = path.join(__dirname, '../../../../public/carousel-pictures')
const jsonFilePath = path.join(__dirname, 'service.carousel-images-data.json')

// Function to get all subfolders and their images
const generateImageData = () => {
    if (!fs.existsSync(directoryPath)) {
        console.error(`Directory ${directoryPath} does not exist.`)
        return
    }

    // Read the existing JSON file if it exists
    let existingData = []
    if (fs.existsSync(jsonFilePath)) {
        try {
            existingData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'))
        } catch (error) {
            console.error('Error parsing existing JSON data:', error)
        }
    }

    // Create a lookup map from the existing data for easy access
    const existingDataMap = new Map()
    existingData.forEach((folder) => {
        const imageMap = new Map()
        folder.images.forEach((image) => {
            imageMap.set(image.src, {  // Store `alt` and `extraCaption` in an object
                alt: image.alt,
                extraCaption: image.extraCaption,
            })
        })
        existingDataMap.set(folder.name, imageMap)
    })


    // Get all subfolders and their images
    const folders = fs.readdirSync(directoryPath, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name)

    const data = folders.map((folder) => {
        // Strip the numeric prefix to match the existingDataMap keys
        const folderNameWithoutPrefix = folder.split('-')[1]
    
        const images = fs.readdirSync(path.join(directoryPath, folder))
            .filter((file) => /\.(png|jpe?g|webp)$/i.test(file))
            .map((file) => {
                const filePath = `carousel-pictures/${folder}/${file}`
    
                // Use folderNameWithoutPrefix for map lookup
                const existingImage = existingDataMap.get(folderNameWithoutPrefix)?.get(filePath)
    
                return {
                    src: filePath,
                    alt: existingImage?.alt || filePath.split('.')[1],
                    extraCaption: existingImage?.extraCaption ?? null,
                }
            })
    
        return {
            name: folderNameWithoutPrefix,
            images,
        }
    })
        

    // Write the data to a JSON file inside the Carousel component directory
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2))
    console.log('service.carousel-images-data.json generated successfully!')
}

// Run the function
generateImageData()
