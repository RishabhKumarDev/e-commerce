export const registerFormConfig = [
    {
        name: "userName",
        label: "User Name",
        placeholder: "Enter your name",
        componentType: "input",
        type: "text"
    }, {
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        componentType: "input",
        type: "email"
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
        componentType: "input",
        type: "password"
    },
]

export const loginFormConfig = [
    {
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        componentType: "input",
        type: "email"
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
        componentType: "input",
        type: "password"
    },
]

export const addProductFormConfig = [
    {
        name: "title",
        label: "Product Title",
        placeholder: "Enter product title",
        componentType: "input",
        type: "text"
    },
    {
        name: "description",
        label: "Description",
        placeholder: "Enter product description",
        componentType: "textarea"
    },
    {
        name: "category",
        label: "Category",
        componentType: "select",
        options: [
            { id: "men", label: "Men" },
            { id: "women", label: "Women" },
            { id: "kids", label: "Kids" },
            { id: "footwear", label: "Footwear" },
            { id: "accessories", label: "Accessories" },
        ]
    },
    {
        name: "brand",
        label: "Brand",
        componentType: "select",
        options: [
            { id: "nike", label: "Nike" },
            { id: "puma", label: "Puma" },
            { id: "adidas", label: "Adidas" },
            { id: "reebok", label: "Reebok" },
            { id: "new-balance", label: "New Balance" },
        ]
    },
    {
        name: "price",
        label: "Price",
        placeholder: "Enter price",
        componentType: "input",
        type: "number"
    },
    {
        name: "salePrice",
        label: "Sale Price",
        placeholder: "Enter sale price",
        componentType: "input",
        type: "number"
    },
    {
        name: "totalStock",
        label: "Total Stock",
        placeholder: "Enter total stock",
        componentType: "input",
        type: "number"
    },
];

export const shoppingViewHeaderMenuItems = [
    {
        id: "home",
        label: "Home",
        path: "/shopping/home"
    },
     {
        id: "products",
        label: "Products",
        path: "/shopping/listing"
    },
    {
        id: "men",
        label: "Men",
        path: "/shopping/listing"
    },
    {
        id: "women",
        label: "Women",
        path: "/shopping/listing"
    },
    {
        id: "kids",
        label: "Kids",
        path: "/shopping/listing"
    },
    {
        id: "accessories",
        label: "Accessories",
        path: "/shopping/listing"
    },
    {
        id: "footwear",
        label: "Footwear",
        path: "/shopping/listing"
    },
    {
        id: "search",
        label: "Search",
        path: "/shopping/search"
    }
]

export const filterOptions = {
    category: [
        { id: "men", label: "Men" },
        { id: "women", label: "Women" },
        { id: "kids", label: "Kids" },
        { id: "accessories", label: "Accessories" },
        { id: "footwear", label: "Footwear" },
    ],

    brand: [
        { id: "nike", label: "Nike" },
        { id: "adidas", label: "Adidas" },
        { id: "levi", label: "Levi's" },
        { id: "puma", label: "Puma" },
        { id: "zara", label: "Zara" },
        { id: "h&m", label: "H&M" },

    ]
};

export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },

]

export const addressFormControls = [
    {
        name: "address",
        label: "Address",
        placeholder: "Enter your address",
        componentType: "input",
        type: "text"
    },
    {
        name: "city",
        label: "City",
        placeholder: "Enter your city",
        componentType: "input",
        type: "text"
    },
    {
        name: "pincode",
        label: "Pincode",
        placeholder: "Enter your pincode",
        componentType: "input",
        type: "text"
    },
    {
        name: "phone",
        label: "Phone",
        placeholder: "Enter your Phone number",
        componentType: "input",
        type: "text"
    },
    {
        name: "notes",
        label: "Notes",
        placeholder: "Add some aditional notes",
        componentType: "textarea",
        type: "textarea"
    },
];