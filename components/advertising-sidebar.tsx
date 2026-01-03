"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Upload, X } from "lucide-react"
import Image from "next/image"

export function AdvertisingSidebar() {
  const { user } = useAuth()
  const pathname = usePathname()
  
  // Solo mostrar publicidad en la página principal
  if (pathname !== "/") {
    return null
  }
  const [ads, setAds] = useState<{
    id: string
    imageUrl: string
    title: string
    description: string
  }[]>([
    {
      id: "1",
      imageUrl: "https://via.placeholder.com/300x400?text=Publicidad+1",
      title: "Publicidad Demo",
      description: "Esta es una publicidad de ejemplo",
    },
  ])
  const [isUploading, setIsUploading] = useState(false)
  const [newAd, setNewAd] = useState({ title: "", description: "" })

  // Verificar si es admin o writer para permitir editar
  const canEdit = user && (user.role === "admin" || user.role === "writer")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setIsUploading(true)
      const reader = new FileReader()
      reader.onloadend = () => {
        const ad = {
          id: Date.now().toString(),
          imageUrl: reader.result as string,
          title: newAd.title || "Sin título",
          description: newAd.description || "Sin descripción",
        }
        setAds([ad, ...ads])
        setNewAd({ title: "", description: "" })
        setIsUploading(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeAd = (id: string) => {
    setAds(ads.filter((ad) => ad.id !== id))
  }

  return (
    <aside className="w-full lg:w-80 lg:sticky lg:top-20 lg:h-fit">
      <Card className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold text-sm mb-2 text-center">Publicidad</h3>
          {canEdit && (
            <p className="text-xs text-muted-foreground mb-4 text-center">
              Sube y gestiona tus anuncios
            </p>
          )}

          {canEdit && (
            <div className="space-y-3 mb-4 pb-4 border-b border-border">
              <div>
                <label className="text-xs font-medium mb-1 block">
                  Título
                </label>
                <Input
                  placeholder="Título del anuncio"
                  value={newAd.title}
                  onChange={(e) =>
                    setNewAd({ ...newAd, title: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-xs font-medium mb-1 block">
                  Descripción
                </label>
                <Textarea
                  placeholder="Descripción del anuncio"
                  value={newAd.description}
                  onChange={(e) =>
                    setNewAd({ ...newAd, description: e.target.value })
                  }
                  className="min-h-16 text-xs"
                />
              </div>

              <label className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                <Upload className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {isUploading ? "Subiendo..." : "Subir imagen"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>

        <div className="space-y-3">
          {ads.length > 0 ? (
            ads.map((ad) => (
              <div key={ad.id} className="relative group border rounded-lg p-2">
                <div className="relative w-full h-40 bg-muted rounded-lg overflow-hidden mb-2">
                  <Image
                    src={ad.imageUrl}
                    alt={ad.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-1 text-xs">
                  <h4 className="font-semibold truncate text-xs text-center">{ad.title}</h4>
                  <p className="text-muted-foreground line-clamp-2 text-xs text-center">
                    {ad.description}
                  </p>
                </div>
                {canEdit && (
                  <button
                    onClick={() => removeAd(ad.id)}
                    className="absolute top-2 right-2 p-1 bg-destructive text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p className="text-sm">No hay publicidades subidas</p>
            </div>
          )}
        </div>
      </Card>
    </aside>
  )
}
