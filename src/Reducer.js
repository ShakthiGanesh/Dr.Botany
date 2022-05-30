export const initialState = {
  disease: null,
  crop: null,
  image: null,
  Action: null,
  email: null,
  viewRes: false,
  single_search: {},
  clickedChannel: null,
  url: null,
};
export const reducer = (state, action) => {
  switch (action.type) {
    case "DISEASE": {
      var disease = action.disease;
      return {
        ...state,
        disease: disease,
      };
    }
    case "URL": {
      var url = action.url;
      return {
        ...state,
        url: url,
      };
    }
    case "SINGLE_SEARCH": {
      var single_search = action.single_search;
      return {
        ...state,
        single_search: single_search,
      };
    }
    case "VIEW_RES": {
      var viewRes = action.viewRes;
      return {
        ...state,
        viewRes: viewRes,
      };
    }
    case "EMAIL": {
      var email = action.email;
      return {
        ...state,
        email: email,
      };
    }
    case "CROP": {
      var crop = action.crop;
      return {
        ...state,
        crop: crop,
      };
    }
    case "IMAGE": {
      var image = action.image;
      return {
        ...state,
        image: image,
      };
    }

    case "ACTION": {
      var action = action.Action;
      console.log(action);
      return {
        ...state,
        Action: action,
      };
    }
  }
};
