// Import the `fs` module for file system interactions and `path` for directory management
const fs = require('fs')
const path = require('path')

// Define the directory to scan (relative to this script’s location)
const directoryPath = path.join(__dirname, '../../../public/single-carousel-folder')
const jsonFilePath = path.join(__dirname, 'service.single-folder-carousel-images-data.json')

// Function to get all images in a single folder
const generateSingleFolderImageData = () => {
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
    existingData.forEach((image) => {
        existingDataMap.set(image.src, {  // Store `alt` and `extraCaption` in an object
            alt: image.alt,
            extraCaption: image.extraCaption,
        })
    })

    // Get all images in the specified directory
    const images = fs.readdirSync(directoryPath)
        .filter((file) => /\.(png|jpe?g|webp)$/i.test(file))
        .map((file) => {
            const filePath = `/single-carousel-folder/${file}`

            // Use existing data if available for this image
            const existingImage = existingDataMap.get(filePath)

            return {
                src: filePath,
                alt: existingImage?.alt || filePath.split('.')[1],
                extraCaption: existingImage?.extraCaption ?? null,
            }
        })

    // Prepare the JSON data format with a single section
    const data = {
        name: "Single Folder Carousel",
        images,
    }

    // Write the data to a JSON file
    fs.writeFileSync(jsonFilePath, JSON.stringify(data, null, 2))
    console.log('single-folder-carousel-images-data.json generated successfully!')
}

// Run the function
generateSingleFolderImageData()
