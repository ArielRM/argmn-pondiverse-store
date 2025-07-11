export const DEFAULT_INSTANCE =
{
  name: "Argmn Pondiverse Store",
  home: "https://argmn.github.io/",
  addCreation: "https://argmn--f45113aa29d611f08f5b569c3dd06744.web.val.run/add-creation",
  getCreation: "https://argmn--f45113aa29d611f08f5b569c3dd06744.web.val.run/get-creation?id=",
  getCreationImage: "https://argmn--f45113aa29d611f08f5b569c3dd06744.web.val.run/get-creation-image?id=",
  getCreations: "https://argmn--f45113aa29d611f08f5b569c3dd06744.web.val.run/get-creations",
  deleteCreation: "https://argmn--f45113aa29d611f08f5b569c3dd06744.web.val.run/delete-creation",
  updateTable: "https://argmn--f45113aa29d611f08f5b569c3dd06744.web.val.run/update-table",
  setCreationHidden: "https://argmn--f45113aa29d611f08f5b569c3dd06744.web.val.run/set-hidden",
  login: "https://argmn--f45113aa29d611f08f5b569c3dd06744.web.val.run/user"
};

const response = `{"ok":true,"rows":[{"id":4,"title":"TestFromPondiverse","data":"None","type":"image","image":"https://argmn--f45113aa29d611f08f5b569c3dd06744.web.val.run/get-creation-image?id=4","time":"2025-05-06T00:40:57.519Z"},{"id":3,"title":"Test3","data":"here is some text asdsa here is some textsa here is some textas here is some textas ass here is some textssd sad asd asskval k pskapsvpsaf  wfkwf assasl wkp afpwkawd s dmlf l fafwpo  dalw wpdpwad a\\\\\","type":"test","image":null,"time":"2025-05-06T00:19:14.698Z"},{"id":2,"title":"Test2","data":"here is some text","type":"test","image":null,"time":"2025-05-05T23:41:18.068Z"},{"id":1,"title":"Test1","data":"here is some text","type":"test","image":null,"time":"2025-05-05T23:41:12.869Z"}]}`

const PONDIVERSE_BUTTON_STYLE = `
	.pondiverse-button-container {
		position: fixed;
		box-sizing: border-box;
		bottom: 0;
		right: 0;
		z-index: 9999;
	}

	.pondiverse-button {
		border-radius: 100%;
		background-color: #4680ff;
		border: white 3px solid;
		height: 45px;
		width: 45px;
		cursor: pointer;
		margin: 10px;
		transition: transform 0.2s;
		color: white;
		font-size: 25px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	}

	.pondiverse-button:hover {
		transform: scale(1.1);
	}

	#pondiverse-dialog {
		color: white;
		font-size: 20px;
		text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
		font-family: sans-serif;
		padding: 0px;
		background-color: transparent;
		border: none;
	}

	#pondiverse-dialog a {
		color: #46ff80;
		font-weight: bold;
	}

	#pondiverse-dialog a:focus {
		outline: 2px solid #46ff80;
	}

	#pondiverse-dialog a:hover {
		background-color: #46ff80;
		color: black;
		text-shadow: none;
		text-decoration: none;
		outline: 2px solid #46ff80;
	}

	#pondiverse-dialog form {
		// box-sizing: border-box;
		background-color: #4680ff;
		border-radius: 20px;
		outline: none;
		border: 3px solid white;
		padding: 20px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	}

	#pondiverse-dialog input[type="text"] {
		width: 100%;
		padding: 10px 15px;
		margin: 10px 0;
		border: 3px inset #3670ee;
		border-radius: 10px;
		background-color: #fff;
		color: #000;
		font-size: 16px;
	}

	#pondiverse-dialog:focus {
		outline: none;
	}

	#pondiverse-dialog input[type="text"]:focus {
		outline: 2px solid #46ff80;
		outline-offset: 0px;
	}

	#pondiverse-dialog button {
		background-color: #4680ff;
		padding: 10px 20px;
		border-radius: 10px;
		cursor: pointer;
		font-size: 16px;
		color: white;
		margin-top: 10px;
		border: 3px outset #3670ee;
		user-select: none;
	}

	#pondiverse-dialog button:focus {
		border: 3px inset #3670ee;
	}

	#pondiverse-dialog hgroup.space {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}

	#pondiverse-dialog #preview-image {
		max-width: 100%;
		max-height: 300px;
		margin: 10px auto;
	}
`;

//============================//
// FETCH PONDIVERSE CREATIONS //
//============================//
// For getting a list of all creations
export async function fetchPondiverseCreations({
  instance = DEFAULT_INSTANCE,
} = {}) {
  //const response = await fetch(instance.getCreations);
  //const json = await response.json();
  const json = JSON.parse(response)
  return json.rows ?? json.items;
}

//===========================//
// FETCH PONDIVERSE CREATION //
//===========================//
// For getting a single creation by its id
export async function fetchPondiverseCreation(
  creation,
  { instance = DEFAULT_INSTANCE } = {}
) {
  const url = isNaN(parseInt(creation))
    ? creation
    : instance.getCreation + creation;
  const response = await fetch(url);
  return await response.json();
}

//============================//
// DELETE PONDIVERSE CREATION //
//============================//
// For deleting a creation by its id
export async function deletePondiverseCreation(
  id,
  { instance = DEFAULT_INSTANCE, password = "" } = {}
) {
  const response = await fetch(instance.deleteCreation, {
    method: "POST",
    body: JSON.stringify({ id, password }),
  });
  const json = await response.json();
  if (!response.ok) {
    throw new Error(json.error);
  }
  return json;
}

//===================================//
// GET PONDIVERSE CREATION IMAGE URL //
//===================================//
// Get the image URL for a creation
export function getPondiverseCreationImageUrl(
  creation,
  { instance = DEFAULT_INSTANCE } = {}
) {
  if (creation.image) {
    return creation.image;
  }
  if (!instance.getCreationImage) {
    return null;
  }
  return instance.getCreationImage + creation.id;
}

export async function updatePondiverseTable(
  { instance = DEFAULT_INSTANCE, password = "" } = {}
) {
  let response = await fetch(instance.updateTable, {
    method: "POST",
    body: JSON.stringify({ password }),
  });
  return response.status;
}

//=======================//
// ADD PONDIVERSE BUTTON //
//=======================//
export function addPondiverseButton(
  getPondiverseCreation,
  { instance = DEFAULT_INSTANCE } = {}
) {
  if (window["addedPondiverseButton"]) return;

  window["getPondiverseCreation"] = getPondiverseCreation;
  const styleSheet = document.createElement("style");
  styleSheet.innerText = PONDIVERSE_BUTTON_STYLE;
  document.head.appendChild(styleSheet);

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "pondiverse-button-container";

  const button = document.createElement("button");
  button.className = "pondiverse-button";
  button.textContent = "✶";

  buttonContainer.append(button);
  document.body.append(buttonContainer);

  button.addEventListener("pointerdown", (e) => e.stopPropagation());
  button.addEventListener("mousedown", (e) => e.stopPropagation());
  button.addEventListener("click", (e) => {
    e.stopPropagation();
    openPondiverseDialog();
  });

  window["addedPondiverseButton"] = true;
  addPondiverseDialog(getPondiverseCreation, { instance });
}

function addPondiverseDialog(
  getPondiverseCreation = window["getPondiverseCreation"],
  { instance = DEFAULT_INSTANCE } = {}
) {
  window["getPondiverseCreation"] = getPondiverseCreation;

  if (window["addedPondiverseDialog"]) return;

  const dialog = document.createElement("dialog");
  document.body.append(dialog);
  dialog.id = "pondiverse-dialog";

  const instance_home = instance.home;
  const instance_name = instance.name;

  dialog.innerHTML = `
  <form>
  <p>Do you want to share your creation to the <a href="https://pondiverse.com" target=_blank rel="noopener noreferrer">pondiverse</a>?</p>
	<p>Via <a href="${instance.home}" target=_blank rel="noopener noreferrer">${instance_name}</a></p>
  <p>All creations get deleted after 25 hours.</p>
	<p><img id="preview-image" src="" alt="Thumbnail of your creation"></p>
	<label for="name">Title</label>
	<input type="text" id="name" name="name" required autocomplete="off" spellcheck="false" />
	<input type="hidden" name="data" value="" />
	<input type="hidden" name="type" value="" />
	<hgroup class="space">
		<button type="button" class="secondary" id="cancel">Cancel</button>
		<button type="submit">Publish</button>
	</hgroup>
  </form>
  `;

  /** @type {HTMLImageElement | null} */
  const previewImage = dialog.querySelector("#preview-image");
  if (!previewImage) throw new Error("Preview image not found.");

  previewImage.onerror = () => {
    previewImage.style.display = "none";
  };
  previewImage.onload = () => {
    previewImage.style.display = "block";
  };

  /** @type {HTMLInputElement | null} */
  const nameInput = dialog.querySelector("#name");
  if (!nameInput) throw new Error("Name input not found.");

  nameInput.addEventListener(
    "keydown",
    (e) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
    },
    { passive: false }
  );

  dialog.addEventListener(
    "keydown",
    (e) => {
      e.stopPropagation();
      e.stopImmediatePropagation();
    },
    { passive: false }
  );

  dialog.addEventListener("pointerdown", (e) => e.stopPropagation());
  dialog.addEventListener("mousedown", (e) => e.stopPropagation());
  dialog.addEventListener("wheel", (e) => {
    e.stopPropagation();
    e.preventDefault();
  });

  const cancelButton = dialog.querySelector("#cancel");
  if (!cancelButton) throw new Error("Cancel button not found.");

  cancelButton.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    closePondiverseDialog();
  });

  const form = dialog.querySelector("form");
  if (!form) throw new Error("Form not found.");

  /** @type {HTMLInputElement | null} */
  const hiddenInput = dialog.querySelector("input[name='data']");
  if (!hiddenInput) throw new Error("Hidden input not found.");

  /** @type {HTMLInputElement | null} */
  const typeInput = dialog.querySelector("input[name='type']");
  if (!typeInput) throw new Error("Type input not found.");

  form.addEventListener("submit", async (e) => {
    e.stopPropagation();
    e.preventDefault();

    const request = {
      title: nameInput.value,
      data: hiddenInput.value,
      type: typeInput.value,
    };
    const image = previewImage.getAttribute("src");
    if (image !== "") { request.image = image; }

    /** @type {HTMLButtonElement | null} */
    const publishButton = form.querySelector("button[type='submit']");
    if (!publishButton) throw new Error("Publish button not found.");
    publishButton.disabled = true;
    publishButton.textContent = "Publishing...";
    publishButton.style.cursor = "not-allowed";

    const response = await fetch(instance.addCreation, {
      method: "POST",
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      alert("Upload failed. Oh no!");
      return;
    }
    console.log(await response.json());

    closePondiverseDialog();
  });

  window["addedPondiverseDialog"] = true;
}

//========================//
// OPEN PONDIVERSE DIALOG //
//========================//
// Use this if you want to programmatically open the dialog
export function openPondiverseDialog(
  getPondiverseCreation = window["getPondiverseCreation"],
  { instance = DEFAULT_INSTANCE } = {}
) {
  addPondiverseDialog(getPondiverseCreation, { instance });

  /** @type {HTMLDialogElement | null} */
  const dialog = document.querySelector("#pondiverse-dialog");
  if (!dialog) throw new Error("Pondiverse dialog not found.");

  dialog.showModal();

  /** @type {HTMLButtonElement | null} */
  const titleInput = dialog.querySelector("#name");
  if (!titleInput) throw new Error("Title input not found.");
  titleInput.value = "";
  titleInput.focus();

  /** @type {HTMLImageElement | null} */
  const previewImage = dialog.querySelector("#preview-image");
  if (!previewImage) throw new Error("Preview image not found.");

  const getCreation = window["getPondiverseCreation"];
  if (!getCreation) {
    throw new Error(
      `\ngetPondiverseCreation function not specified.\n\nIf you want your creation to be sent to the Pondiverse, pass a function as an argument that returns a JSON object. The JSON object can provide:\n- type: A string to identify what kind of creation it is. For example, "screenpond" if it's intended to be loaded into screenpond.\n- data: A string containing the data of your creation, so that it can be loaded up again.\n- image: A base64 data URL string to be used as a thumbnail for your creation.\n\nAll properties are optional.`
    );
  }

  const creation = getCreation();

  /** @type {HTMLInputElement | null} */
  const hiddenInput = dialog.querySelector("input[name='data']");
  if (!hiddenInput) throw new Error("Hidden input not found.");

  /** @type {HTMLInputElement | null} */
  const typeInput = dialog.querySelector("input[name='type']");
  if (!typeInput) throw new Error("Type input not found.");

  if (creation.image) previewImage.src = creation.image;
  if (creation.data) hiddenInput.value = creation.data;
  if (creation.type) typeInput.value = creation.type;
  if (creation.title) titleInput.value = creation.title;
}

//=========================//
// CLOSE PONDIVERSE DIALOG //
//=========================//
// Use this if you want to programmatically close the dialog
export function closePondiverseDialog() {
  /** @type {HTMLDialogElement | null} */
  const dialog = document.querySelector("#pondiverse-dialog");
  if (!dialog) {
    throw new Error("Could not find the Pondiverse dialog to close.");
  }

  /** @type {HTMLButtonElement | null} */
  const publishButton = dialog.querySelector("button[type='submit']");
  if (!publishButton) throw new Error("Publish button not found.");

  publishButton.disabled = false;
  publishButton.textContent = "Publish";
  publishButton.style.cursor = "pointer";
  dialog.close();
}

