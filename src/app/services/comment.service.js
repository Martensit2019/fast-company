import httpService from "./http.service";
const commentEndpoint = "comment/";

const commentService = {
  createComment: async (patload) => {
    const { data } = await httpService.put(
      commentEndpoint + patload._id,
      patload
    );
    return data;
  },
  getComments: async (pageId) => {
    const { data } = await httpService.get(commentEndpoint, {
      params: {
        orderBy: "\"pageId\"",
        equalTo: `"${pageId}"`
      }
    });
    return data;
  }
};

export default commentService;
