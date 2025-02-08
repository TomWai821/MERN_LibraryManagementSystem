const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const ValidateField = (name:string, value:string) => 
{
    let error = "";
    let helperText  = "";
    if(!value)
    {
        error = `{$name} is required`;
        helperText = `{$name} cannot be empty`;
    }
    else
    {
        switch(name)
        {
            case "email":
                if (!emailRegex.test(value)) 
                {
                    error = "Invalid email address";
                    helperText = "Please enter a valid email address";
                }
                break;
            
            case "username":
                if(value.length < 6)
                {
                    error = "Username must be at least 6 characters long";
                    helperText = "Username must be at least 6 characters longs";
                }
                break;
                
            case "password":
                if(value.length < 6)
                {
                    error = "Password must be at least 6 characters long";
                    helperText = "Password must be at least 6 characters longs";
                }
                break;

            default:
                 break;
        }
    }
        
    return {error, helperText};
}