import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'


const apiKey = process.env.REACT_APP_YT_API;
const baseUrl = 'https://www.googleapis.com/youtube/v3';

export const songsApi = createApi({
  reducerPath: 'songsApi',
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),

  endpoints: (builder) => ({
    getSongsById: builder.query({
      query: (songId) => ({
        url:'videos',
        params: {
          part: ['snippet','contentDetails'],
          id: songId,
          key: apiKey,
        },
        method: 'GET'
      })
    }),
  
  
    getPlaylistItems: builder.query({
      query: (playlistId) => ({
        url:'playlistItems' ,
        params: {
          part: 'snippet',
          playlistId: playlistId,
          maxResults: '10',
          key: apiKey,
        },
        method: 'GET'
      })
    }),

    getSearchItems: builder.query({
      query: (searchQuery) => ({
        url:'search' ,
        params: {
          part: 'snippet',
          q:searchQuery,
          type: 'video',
          maxResults: '50',
          key: apiKey,
        },
        method: 'GET'
      })
    }),
    getSearchRelatedItems: builder.query({
      query: (videoId) => ({
        url:'search' ,
        params: {
          part: 'snippet',
          relatedToVideoId : videoId,
          type: 'video',
          videoCategoryId: '10',
          maxResults: '10',
          key: apiKey,
        },
        method: 'GET'
      })
    })

  }),

}) 

export const {useGetPlaylistItemsQuery,useGetSongsByIdQuery,useGetSearchItemsQuery,useGetSearchRelatedItemsQuery} = songsApi