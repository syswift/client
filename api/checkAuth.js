import { supabase } from "../api";

export const checkAuth = async () =>{
    let auth_level;

    if(supabase.auth.user())
    {
        try {
            const{data, error} = await supabase.from('profiles').select().eq('id',supabase.auth.user().id).single();

            if(error) throw error;

            //console.log(data.auth_level);

            auth_level = data.auth_level;
            return auth_level;
        } catch (error) {
            console.log(error);
            return '';
        }
    }
}
    