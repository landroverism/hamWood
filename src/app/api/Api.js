import supabase from "../../utils/supabase_Client";

// Define the table name to use throughout the application
const TABLE_NAME = "products";

// Function to create the products table in Supabase
export const CreateTable = async () => {
  try {
    console.log(`Creating ${TABLE_NAME} table in Supabase...`);
    
    // We can't directly create tables via the Supabase JS client
    // Instead, we'll check if the table exists and return a message
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select()
      .limit(1);
    
    if (error && error.message.includes("does not exist")) {
      console.error(`Table ${TABLE_NAME} doesn't exist. Please create it in the Supabase dashboard.`);
      return { 
        success: false, 
        error,
        message: `Table ${TABLE_NAME} doesn't exist. Please create it in the Supabase dashboard with columns: id, title, name, img, category.`
      };
    } else if (error) {
      console.error(`Error checking ${TABLE_NAME} table:`, error.message);
      return { success: false, error };
    } else {
      console.log(`${TABLE_NAME} table exists!`);
      return { success: true, data };
    }
  } catch (error) {
    console.error("An unexpected error occurred while checking table:", error);
    return { success: false, error };
  }
};

// Function to add a new item to the database
export const AddItem = async (item) => {
  try {
    if (item.title === "" || item.name === "" || item.img === "" || item.category === "") {
      alert("Fill all fields!");
      return { error: "Missing required fields" };
    }
    
    console.log(`Adding item to ${TABLE_NAME} table...`);
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .insert({ 
        title: item.title, 
        name: item.name, 
        img: item.img, 
        category: item.category 
      });
    
    if (error) {
      console.error(`Error adding item to ${TABLE_NAME}:`, error.message);
      alert(`Error: ${error.message}`);
    } else {
      console.log(`Item added to ${TABLE_NAME} successfully!`);
      alert("Data sent successfully!");
    }
    
    return { data, error };
  } catch (error) {
    console.error("An error occurred while adding item:", error);
    alert(`Unexpected error: ${error.message}`);
    return { error };
  }
};

// Function to fetch all items from the database
export const FetchItems = async () => {
  try {
    console.log(`Fetching items from ${TABLE_NAME} table...`);
    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select();
    
    if (error) {
      console.error(`Error fetching from ${TABLE_NAME}:`, error.message);
      return [];
    }
    
    console.log(`Fetched ${data?.length || 0} items from ${TABLE_NAME} successfully!`);
    return data || [];
  } catch (error) {
    console.error("An unexpected error occurred while fetching items:", error);
    return [];
  }
};
