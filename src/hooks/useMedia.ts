import { AxiosError } from "axios";
import { ChangeEvent, useState } from "react";
import { Media } from "src/interfaces";
import apis from "src/apis";


type PostType = {
  e: ChangeEvent<HTMLInputElement>,
  callBack?: (data: Media[]) => void,
  onError?: (error: AxiosError) => void,
  resetOriginalUrl?: boolean
}

export function useMedia() {
  const [medias, setMedias] = useState<Media[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const handlePostMedia = async ({ e, callBack, onError, resetOriginalUrl = false }: PostType) => {
    if (e.target.files) {
      setIsLoading(true)
      let tempImages: Media[] = []
      for (var j = 0; j < e.target.files?.length; j++) {
        const item = {
          model_id: -j,
          original_url: URL.createObjectURL(e.target.files[j]),
          mine_type: e.target.files[j].type
        }
        tempImages.push(item)
      }
      if (callBack) { callBack(tempImages) }
      try {
        const mediaList: Media[] = []
        for (var i = 0; i < e.target.files?.length; i++) {
          const fileItem = e.target.files[i]
          let formData = new FormData()
          let resMedia = {
            original_url: URL.createObjectURL(fileItem),
            model_id: i,
            mine_type: e.target.files[i].type
          }
          formData.append('file', fileItem)
          const response = await apis.postMedia(formData)
          if (response) {
            resMedia = {
              ...resMedia,
              model_id: response.context.model_id,
              original_url: resetOriginalUrl ? response.context.original_url : resMedia.original_url
            }
          }
          mediaList.push(resMedia)
        }
        setMedias(mediaList)
        setIsLoading(false)
        if (callBack) { callBack(mediaList) }
      } catch (error) {
        const err = error as AxiosError
        if (onError) {
          onError(err)
        }
      }
    }
  }
  return {
    medias,
    handlePostMedia,
    isLoading
  }
}