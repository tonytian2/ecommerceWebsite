import registrationApi from '../api/registration';
import productsApi from '../api/products';


export default async  function PopulateDB()  {
    function delay(time) {
        return new Promise(resolve => setTimeout(resolve, time));
    }
      
    const username = "root"
    const password = "qwe123"

    const registerUser = async () => {
        try {
            const response = await registrationApi.post(`/?username=${username}&password=${password}`)
        } catch (err) {
            if (err.response) {
                console.log(`${err.response.data}`)
            }else{
                console.log(`${err.message}`)
            } 
        }
    }

    const createProduct1 = async () => {
        try {
            const product = {
                productName: "Corel WordPerfect Office Standard 2021",
                createdTime: Date.now(),
                price:"174.99",
                imageURL:"https://m.media-amazon.com/images/I/61BDbl19LaL._AC_SX522_.jpg",
                description:"WordPerfect Office Standard 2021 introduces the latest version of the office suite designed to support your everyday work needs—from crafting documents and presentations, to creating impressive spreadsheets! Publish your eBook, edit a PDF, import or export files in 60+ different formats, and more, all with this user-friendly toolkit. Whether you’re new to WordPerfect or you’ve been instrumental in shaping our enhancements through critical feedback, we’ve made it simpler and more intuitive to discover the tools you need to surpass expectations—including your own!",
                soldQuantity:16,
                username: `${username}`,

            }
            const response = await productsApi.post("/", product,  {headers: { authorization: 'Basic ' + window.btoa(username+ ":" + password)   }} )
        } catch (err) {
            if (err.response) {
                console.log(`${err.response.data}`)
            }else{
                console.log(`${err.message}`)
            } 
        }
    }
    const createProduct2 = async () => {
        try {
            const product = {
                productName: "Pinnacle Studio 26 Ultimate | Pro-Level Video Editing & Screen Recording Software",
                createdTime: Date.now(),
                price:'89.99',
                imageURL:"https://m.media-amazon.com/images/I/71Ob-khrtbL._AC_SX522_.jpg",
                description:"Enjoy pro-level video editing across unlimited tracks with the complete control, precision, and boosted performance of Pinnacle Studio 26 Ultimate! Tap into advanced tools, hundreds of creative effects, and powerful keyframe controls to fine-tune every parameter of your production. Leverage an expansive collection of features and effects that will take your editing to new creative heights, and command control over your editing experience with a fully customizable interface. Edit with unparalleled accuracy and create custom tool shortcuts to streamline your most-utilized workflows. Explore Video Masking, complete Color Grading, Motion Tracking, and other Ultimate-exclusive tools to transform your creative vision into cinema-grade productions. Create with inspiration. Edit with Pinnacle.",
                soldQuantity:61,
                username: `${username}`,

            }
            const response = await productsApi.post("/", product,  {headers: { authorization: 'Basic ' + window.btoa(username+ ":" + password)   }} )
        } catch (err) {
            if (err.response) {
                console.log(`${err.response.data}`)
            }else{
                console.log(`${err.message}`)
            } 
        }
    }
    const createProduct3 = async () => {
        try {
            const product = {
                productName: "Roxio Creator NXT 9 | Multimedia Suite and CD/DVD Disc Burning Software",
                createdTime: Date.now(),
                price:"74.99",
                imageURL:"https://m.media-amazon.com/images/I/71j5bJEWdPL._AC_SX569_.jpg",
                description:"Roxio Creator NXT 9 is a fully loaded multimedia and disc burning suite with 20+ applications for all your digital media needs. Capture* and edit your videos, photos, and audio files with intuitive tools—even record your computer screen or capture video from multiple devices. Quickly convert your files to popular formats with NEW easy file converter and share online, export to popular devices, or burn to disc. Explore industry-leading tools to burn and copy your data, author DVDs with customizable menus, and more.  Access Help documentation online, all in one place. Start your next multimedia project with the complete multimedia and burning suite designed for creators!",
                soldQuantity:48,
                username: `${username}`,

            }
            const response = await productsApi.post("/", product,  {headers: { authorization: 'Basic ' + window.btoa(username+ ":" + password)   }} )
        } catch (err) {
            if (err.response) {
                console.log(`${err.response.data}`)
            }else{
                console.log(`${err.message}`)
            } 
        }
    }
    const createProduct4 = async () => {
        try {
            const product = {
                productName: "Corel Painter | 1 Year Subscription | Professional Painting Software for Digital Art",
                createdTime: Date.now(),
                price:"139.0",
                imageURL:"https://m.media-amazon.com/images/I/71os60PBQpL.__AC_SY445_SX342_QL70_FMwebp_.jpg",
                description:"Step into a world of endless possibilities with Painter and create your masterpiece with our trusted painting software. Sketch, paint, and illustrate unparalleled artwork using hundreds of realistic, artist-created brushes, superior blending, impressive textures, and an array of versatile art tools. With a powerful built-in Brush Accelerator™, you can make the most of your CPU and GPU and optimize Painter’s performance with one click. Create your own brushes and other content, customize the UI, and find inspiration by sharing your content with fellow artists. Plus, expand your painting knowledge with a library of free learning resources. Painter 2023. Venture outside the lines.",
                soldQuantity:5,
                username: `${username}`,

            }
            const response = await productsApi.post("/", product,  {headers: { authorization: 'Basic ' + window.btoa(username+ ":" + password)   }} )
        } catch (err) {
            if (err.response) {
                console.log(`${err.response.data}`)
            }else{
                console.log(`${err.message}`)
            } 
        }
    }
    const createProduct5 = async () => {
        try {
            const product = {
                productName: "Roxio Toast 20 Titanium | CD & DVD Burner for Mac",
                createdTime: Date.now(),
                price:"64.99",
                imageURL:"https://m.media-amazon.com/images/I/61Xh7g9ebsL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
                description:"Discover NEW Roxio® Toast® 20 Titanium, the preferred CD & DVD burner for Mac. Toast Titanium goes beyond traditional disc burning to deliver a complete digital media management suite. Explore a set of streamlined tools designed to burn, copy*, rip, capture, convert, and apply basic edits to your videos, audio, and data files intuitively. Author DVDs with fully customizable menus using the new Template Designer and leverage new tools to change your layout, background, and more. Quickly create and encrypt disc backups to store your files securely, and even convert local files to popular formats using new quick file conversion tools. Roxio Toast 20 Titanium is your all-in-one disc and digital media solution.",
                soldQuantity:41,
                username: `${username}`,

            }
            const response = await productsApi.post("/", product,  {headers: { authorization: 'Basic ' + window.btoa(username+ ":" + password)   }} )
        } catch (err) {
            if (err.response) {
                console.log(`${err.response.data}`)
            }else{
                console.log(`${err.message}`)
            } 
        }
    }
    console.log("creating root...")
    registerUser()
    console.log(`${username} created, password: ${password}`)
    await delay(1000);
    console.log("Creating products...")
    createProduct1()
    createProduct2()
    createProduct3()
    createProduct4()
    createProduct5()
    console.log("5 Products created")
    window.alert(`DevTool:\n\t${username} created, password: ${password} \n\t5 Products created`)
    window.location.reload(true)
    
}