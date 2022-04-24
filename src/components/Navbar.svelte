<script>
    import {supabase} from "../supabase.js";

    const logout = () => {
        console.log("Logging out.");
        supabase.auth.signOut();
    }
</script>

<div class="my-4 flex justify-end">
    <button on:click={logout} class="shadow-sm rounded bg-blue-500 hover:bg-blue-300 text-white py-2 px-4">
        Logout
    </button>
</div>