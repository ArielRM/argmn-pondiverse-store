use argmn_pondiverse_store::App;
use leptos::prelude::*;


fn main() {
    _ = console_log::init_with_level(log::Level::Debug);
    console_error_panic_hook::set_once();

    mount_to_body(||{
        view! {
            <App />
        }
    });

}