"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, Clock } from "lucide-react"
import { getPublishedArticles, type Article } from "@/lib/auth"
import Link from "next/link"

export default function NewsPage() {
  const [articles, setArticles] = useState<Article[]>([])

  useEffect(() => {
    const loadArticles = async () => {
      const data = await getPublishedArticles()
      setArticles(data)
    }
    loadArticles()
  }, [])

  const youtubeVideoId = "jfKfPfyJRdk"

  const mainNews = {
    title: "Últimas Noticias en Directo desde la Redacción",
    category: "En Vivo",
    time: "Ahora",
    description: "Seguimiento en tiempo real de los acontecimientos más importantes del día",
  }

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      politica: "Política",
      economia: "Economía",
      deportes: "Deportes",
      cultura: "Cultura",
    }
    return labels[cat] || cat
  }

  const featuredArticles = articles.slice(0, 2)
  const secondaryArticles = articles.slice(2, 6)

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-4 md:py-8 relative">
        {/* Featured Articles */}
        <div>
            {/* Featured News Grid */}
            {featuredArticles.length > 0 && (
              <section className="mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-4 md:mb-6 border-b border-border pb-2">
                  Noticias Destacadas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredArticles.map((article) => (
                    <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      <img
                        src={article.imageUrl || "/placeholder.svg?height=400&width=600"}
                        alt={article.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Badge variant="outline">{getCategoryLabel(article.category)}</Badge>
                          <span>•</span>
                          <span>{article.author}</span>
                        </div>
                        <Link href={`/articulo/${article.id}`}>
                          <h3 className="text-xl font-serif font-bold text-foreground hover:text-primary transition-colors text-balance">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-muted-foreground mt-2 text-sm line-clamp-2">{article.excerpt}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

          {/* Secondary News List */}
          {secondaryArticles.length > 0 && (
            <section>
              <h2 className="text-3xl font-serif font-bold text-foreground mb-6 border-b border-border pb-2">
                Más Noticias
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {secondaryArticles.map((article) => (
                  <Card key={article.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">
                          {getCategoryLabel(article.category)}
                        </Badge>
                        <span>{article.author}</span>
                      </div>
                      <Link href={`/articulo/${article.id}`}>
                        <h3 className="font-semibold text-foreground hover:text-primary transition-colors leading-tight text-balance">
                          {article.title}
                        </h3>
                      </Link>
                      <Button variant="ghost" size="sm" className="w-fit text-xs mt-auto" asChild>
                        <Link href={`/articulo/${article.id}`}>Leer más →</Link>
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Live Video - Fixed Float */}
        <aside className="hidden md:block fixed right-4 top-28 w-80 z-40">
          {/* Header Section */}
          <div className="mb-4 flex items-start justify-between">
            <div className="flex-1">
              <h2 className="text-xl font-serif font-bold text-foreground leading-tight mb-2">
                Noticias en Directo
              </h2>
              <p className="text-xs text-muted-foreground">desde la Redacción</p>
            </div>
            <a href="https://www.youtube.com/live/jfKfPfyJRdk" target="_blank" rel="noopener noreferrer" className="shrink-0">
              <Badge variant="destructive" className="animate-pulse text-xs cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap ml-2">
                <Play className="w-3 h-3 mr-1" />
                EN VIVO
              </Badge>
            </a>
          </div>

          {/* Video Section */}
          <a href="https://www.youtube.com/live/jfKfPfyJRdk" target="_blank" rel="noopener noreferrer" className="block cursor-pointer hover:opacity-90 transition-opacity">
            <Card className="overflow-hidden bg-card border-2 border-destructive shadow-lg">
              <div className="aspect-video w-full bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${youtubeVideoId}?autoplay=1&mute=0`}
                  title="YouTube Live Stream"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full pointer-events-none"
                />
              </div>
              <div className="p-3">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Clock className="w-3 h-3" />
                  <span>{mainNews.time}</span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{mainNews.description}</p>
              </div>
            </Card>
          </a>
        </aside>

        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No hay artículos publicados aún. Los escritores pueden comenzar a crear contenido.
            </p>
          </div>
        )}

        {/* Breaking News Ticker */}
        <section className="mt-12 mb-8">
          <Card className="bg-black text-white p-4">
            <div className="flex items-center gap-4">
              <Badge variant="destructive" className="shrink-0">
                ÚLTIMA HORA
              </Badge>
              <div className="overflow-hidden">
                <p className="animate-marquee whitespace-nowrap font-medium">
                  {articles.length > 0
                    ? articles.map((a) => a.title).join(" • ")
                    : "Bienvenido a La Nota Digital - Tu fuente de noticias en tiempo real"}
                </p>
              </div>
            </div>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-serif font-bold text-lg mb-4">La Nota Digital</h3>
              <p className="text-sm text-muted-foreground">Tu fuente confiable de noticias en tiempo real</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Secciones</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/categoria/politica" className="hover:text-foreground transition-colors">
                    Política
                  </Link>
                </li>
                <li>
                  <Link href="/categoria/economia" className="hover:text-foreground transition-colors">
                    Economía
                  </Link>
                </li>
                <li>
                  <Link href="/categoria/deportes" className="hover:text-foreground transition-colors">
                    Deportes
                  </Link>
                </li>
                <li>
                  <Link href="/categoria/cultura" className="hover:text-foreground transition-colors">
                    Cultura
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Información</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/quienes-somos" className="hover:text-foreground transition-colors">
                    Quiénes somos
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="hover:text-foreground transition-colors">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/publicidad" className="hover:text-foreground transition-colors">
                    Publicidad
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Síguenos</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Facebook
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition-colors">
                    Instagram
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>&copy; 2025 La Nota Digital. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
