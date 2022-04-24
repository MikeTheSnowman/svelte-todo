<script>
    import {supabase} from "../supabase.js";
    import { Circle2 } from 'svelte-loading-spinners';

    let loading = false;
    let email;

    const handleLogin = async () => {
        console.log(email);
        
        try {
            loading = true;
            const {error} = await supabase.auth.signIn({email});
            if(error) throw error;
            const msg = "check you email for the login link!";
            console.log(msg);
            alert(msg);
        } catch (error) {
            console.log(error);
            alert(error.error_description || error.message);
        } finally{
            loading = false;
        }
    }
</script>

{#if !loading}
    <h1 class="text-2xl font-bold text-center text-gray-800 md:text-3xl">
        Log In
    </h1>

    <p class="text-center mt-2">Sign in via magic link with you email below.</p>

    <form on:submit|preventDefault={handleLogin}>
        <div class="flex flex-col text-sm mb-2">
            <label class="font-bold mb-2 text-gray-800" for="email">Email</label>
            <input type="email" name="email" class="appearance-none shadow-sm border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-lg" placeholder="Your email" bind:value={email}>
        </div>
        <button typeof="submit" class="w-full shadow-sm rounded bg-blue-500 hoge:bg-blue-600 text-white py-2 px-4">Login</button>
    </form>
{:else if loading}
    <div class="flex flex-col text-sm mb-2 text-center" style="justify-content:center; align-items:center">
        <Circle2 size="60"></Circle2>
    </div>
{/if}