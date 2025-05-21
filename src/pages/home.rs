use std::collections::{BTreeMap, HashMap};
use std::hash::Hash;
use std::sync::Arc;

use leptos::html::{
    button, code, dd, div, dl, dt, figcaption, figure, footer, h1, h2, img, li, main, p, ul,
};
use leptos::prelude::*;
use leptos::tachys::html::property;
use leptos::tachys::view;
use leptos_router::components::{Redirect, RedirectProps};
use leptos_router::hooks::use_query;
use leptos_router::location::Url;
use leptos_router::params::{IntoParam, Params};
use leptos_router::NavigateOptions;
use leptos_use::{
    use_web_notification_with_options, NotificationDirection, ShowOptions,
    UseWebNotificationOptions, UseWebNotificationReturn,
};
use serde::Deserialize;

struct Creation<'json> {
    key: String,
    data: &'json str,
}

impl<'json> Creation<'json> {
    pub fn new(json: &'json str) -> anyhow::Result<Self> {
        #[derive(Deserialize)]
        struct CreationInput {
            id: String,
            time: String,
        }
        let CreationInput { id, mut time } = serde_json::from_str(json)?;
        time.push_str(&id);

        Ok(Self {
            key: time,
            data: json,
        })
    }
}

/// Default Home Page
#[component]
pub fn Index() -> impl IntoView {}
