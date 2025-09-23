
import React, { useMemo, useState } from "react";

// --- UI (shadcn/ui) ---
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

// --- Icons (kept only as fallbacks) ---
import {
  Target,
  Globe,
  ShoppingCart,
  Smartphone,
  Eye,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  Image as ImageIcon,
  Info,
} from "lucide-react"

// --- Channel logos from src/assets/logos/ (adjust relative paths if needed) ---
import FacebookLogo from "../../assets/logos/facebook.png"
import InstagramLogo from "../../assets/logos/instagram.png"
import TikTokLogo from "../../assets/logos/tiktok.png"
import SnapchatLogo from "../../assets/logos/snapchat.png"
import GoogleLogo from "../../assets/logos/google.png"
import SpotifyLogo from "../../assets/logos/spotify.png"
import LinkedinLogo from "../../assets/logos/linkedin.png"
import RedditLogo from "../../assets/logos/reddit.png"
import YoutubeLogo from "../../assets/logos/youtube.png"

/**
 * Helper component: phone mockup frame for previews
 */
const PhoneMockup = ({ children }) => (
  <div className="mx-auto w-[240px] rounded-[38px] bg-black p-3 shadow-xl">
    <div className="h-[12px] w-[92px] mx-auto my-2 rounded-full bg-neutral-800" />
    <div className="rounded-[30px] overflow-hidden bg-white h-[480px] shadow-inner">
      {children}
    </div>
  </div>
)

/**
 * Channels master list (id, label, brand color, logo import, default dimensions hint)
 */
const ALL_CHANNELS = [
  { id: "facebook", name: "Facebook", color: "bg-[#1877F2]", logo: FacebookLogo, dims: "1:1 / 1080×1080" },
  { id: "instagram", name: "Instagram", color: "bg-[#E1306C]", logo: InstagramLogo, dims: "1:1 / 1080×1080" },
  { id: "tiktok", name: "TikTok", color: "bg-[#000000]", logo: TikTokLogo, dims: "9:16 / 1080×1920" },
  { id: "snapchat", name: "Snapchat", color: "bg-[#FFFC00] text-black", logo: SnapchatLogo, dims: "9:16 / 1080×1920" },
  { id: "google", name: "Google Search", color: "bg-[#4285F4]", logo: GoogleLogo, dims: "Text/RSAs" },
  { id: "spotify", name: "Spotify", color: "bg-[#1DB954]", logo: SpotifyLogo, dims: "Audio 30s" },
  { id: "linkedin", name: "LinkedIn", color: "bg-[#0A66C2]", logo: LinkedinLogo, dims: "1.91:1 / 1200×628" },
  { id: "reddit", name: "Reddit", color: "bg-[#FF4500]", logo: RedditLogo, dims: "1:1 / 1200×1200" },
  { id: "youtube", name: "YouTube", color: "bg-[#FF0000]", logo: YoutubeLogo, dims: "16:9 / 1920×1080" },
]

/**
 * Goals
 */
const GOALS = [
  { id: "applications", icon: Target, title: "Bewerbungen", desc: "Mehr Bewerbungen für offene Stellen generieren" },
  { id: "traffic", icon: Globe, title: "Traffic", desc: "Besucher auf Karriereseiten oder Landingpages bringen" },
  { id: "leads", icon: ShoppingCart, title: "Leads", desc: "Kontaktdaten & qualifizierte Anfragen sammeln" },
  { id: "reach", icon: Smartphone, title: "Reichweite", desc: "Bekanntheit & Sichtbarkeit steigern" },
]

/**
 * Image upload helper: which formats do we want the user to provide?
 * (Simple example; extend as needed)
 */
const REQUIRED_FORMATS = ["Quadrat 1:1 (1080×1080)", "Story 9:16 (1080×1920)", "Landscape 1.91:1 (1200×628)"]

/**
 * CampaignWizard
 * NOTE: The overall look & feel (layout, spacing, typography) is intentionally aligned with your existing design.
 */
export default function CampaignWizard() {
  const [step, setStep] = useState(1)

  const [data, setData] = useState({
    goal: "",
    channels: [],
    content: {
      headline: "",
      description: "",
      cta: "",
      url: "",
    },
    media: {
      "Quadrat 1:1 (1080×1080)": null,
      "Story 9:16 (1080×1920)": null,
      "Landscape 1.91:1 (1200×628)": null,
    },
    targeting: {
      locations: "",
      interests: "",
      age: [18, 65],
    },
    budget: {
      total: 500,
      startDate: "",
      endDate: "",
    },
    budgetConfirmed: false,
    finalApproval: false,
  })

  // --- Steps (titles unchanged) ---
  const steps = [
    { id: 1, title: "Ziel & Kanäle", description: "Kampagnenziel und Plattformen auswählen" },
    { id: 2, title: "Inhalte & Medien", description: "Texte erstellen und Bilder hochladen" },
    { id: 3, title: "Vorschau", description: "Kampagnen in Handy-Mockups betrachten" },
    { id: 4, title: "Budget & Freigabe", description: "Budget festlegen und Kampagne freigeben" },
  ]

  const selectedChannels = useMemo(
    () => ALL_CHANNELS.filter((c) => data.channels.includes(c.id)),
    [data.channels]
  )

  // --- Step 3 Pagination (exactly 2 channels per page) ---
  const channelsPerPage = 2
  const totalPages = Math.max(1, Math.ceil(selectedChannels.length / channelsPerPage))
  const [previewPage, setPreviewPage] = useState(0)
  const pageChannels = useMemo(() => {
    const start = previewPage * channelsPerPage
    return selectedChannels.slice(start, start + channelsPerPage)
  }, [selectedChannels, previewPage])

  const canNext = step < steps.length
  const canPrev = step > 1

  const next = () => setStep((s) => Math.min(s + 1, steps.length))
  const prev = () => setStep((s) => Math.max(s - 1, 1))

  const toggleChannel = (id) => {
    setData((prev) => ({
      ...prev,
      channels: prev.channels.includes(id)
        ? prev.channels.filter((c) => c !== id)
        : [...prev.channels, id],
    }))
  }

  const updateContent = (field, value) => {
    setData((prev) => ({ ...prev, content: { ...prev.content, [field]: value } }))
  }

  const updateBudget = (field, value) => {
    setData((prev) => ({ ...prev, budget: { ...prev.budget, [field]: value } }))
  }

  const updateTargeting = (field, value) => {
    setData((prev) => ({ ...prev, targeting: { ...prev.targeting, [field]: value } }))
  }

  const onUpload = (key, file) => {
    setData((prev) => ({ ...prev, media: { ...prev.media, [key]: file } }))
  }

  const brandPill = (channel) => (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-xs font-medium ${channel.color}`}
    >
      <img
        src={channel.logo}
        alt={channel.name}
        className="h-4 w-4 object-contain"
        onError={(e) => {
          e.currentTarget.style.display = "none"
        }}
      />
      <span>{channel.name}</span>
      <span className="opacity-80">· {channel.dims}</span>
    </span>
  )

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header / Breadcrumb */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Kampagnen-Wizard</h1>
            <p className="text-sm text-gray-500">Ein Editor für alle Kanäle</p>
          </div>

          <div className="flex items-center gap-2">
            {steps.map((s) => (
              <div
                key={s.id}
                className={`h-2 w-10 rounded-full ${step >= s.id ? "bg-emerald-500" : "bg-gray-200"}`}
                title={`${s.id}. ${s.title}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
          {steps.map((s) => (
            <Card
              key={s.id}
              className={`border ${step === s.id ? "border-emerald-500" : "border-gray-200"} transition`}
            >
              <CardHeader className="py-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <span className={`h-6 w-6 rounded-full flex items-center justify-center text-white text-xs
                    ${step === s.id ? "bg-emerald-500" : "bg-gray-400"}`}>
                    {s.id}
                  </span>
                  {s.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-500 -mt-2 pb-4">{s.description}</CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="space-y-8">
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-emerald-600" />
                Ziel & Kanäle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Goal selection */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Kampagnenziel</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {GOALS.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setData((p) => ({ ...p, goal: g.id }))}
                      className={`text-left border rounded-xl p-4 hover:shadow-sm transition
                        ${data.goal === g.id ? "border-emerald-500 ring-2 ring-emerald-200" : "border-gray-200"}`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <g.icon className="h-4 w-4 text-gray-700" />
                        <span className="font-medium">{g.title}</span>
                      </div>
                      <p className="text-xs text-gray-500">{g.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Channel selection with real logos */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Kanäle auswählen</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {ALL_CHANNELS.map((c) => {
                    const active = data.channels.includes(c.id)
                    return (
                      <button
                        key={c.id}
                        onClick={() => toggleChannel(c.id)}
                        className={`flex items-center gap-3 border rounded-xl p-3 hover:shadow-sm transition
                          ${active ? "border-emerald-500 ring-2 ring-emerald-200" : "border-gray-200"}`}
                        title={c.name}
                      >
                        <span className={`h-8 w-8 flex items-center justify-center rounded-lg ${c.color}`}>
                          <img src={c.logo} alt={c.name} className="h-5 w-5 object-contain" />
                        </span>
                        <div className="text-left">
                          <div className="text-sm font-medium">{c.name}</div>
                          <div className="text-xs text-gray-500">{c.dims}</div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-purple-600" />
                Inhalte & Medien
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Anzeigentexte</h3>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Überschrift</Label>
                      <Input
                        value={data.content.headline}
                        onChange={(e) => updateContent("headline", e.target.value)}
                        placeholder="z.B. Jetzt bewerben – werden Sie Teil unseres Teams!"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Beschreibung</Label>
                      <Textarea
                        rows={4}
                        value={data.content.description}
                        onChange={(e) => updateContent("description", e.target.value)}
                        placeholder="Kurzbeschreibung der Stelle / Ihres Angebots"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Call-to-Action</Label>
                        <Input
                          value={data.content.cta}
                          onChange={(e) => updateContent("cta", e.target.value)}
                          placeholder="Jetzt bewerben"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Ziel-URL</Label>
                        <Input
                          value={data.content.url}
                          onChange={(e) => updateContent("url", e.target.value)}
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-2">Targeting</h3>
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Region(en)</Label>
                        <Input
                          value={data.targeting.locations}
                          onChange={(e) => updateTargeting("locations", e.target.value)}
                          placeholder="z.B. Köln, Düsseldorf, Ruhrgebiet"
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Interessen / Branchen</Label>
                        <Input
                          value={data.targeting.interests}
                          onChange={(e) => updateTargeting("interests", e.target.value)}
                          placeholder="z.B. Pflege, IT, Handwerk"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-xs">Altersspanne</Label>
                      <div className="flex items-center gap-3">
                        <span className="text-xs w-10 text-right">{data.targeting.age[0]}</span>
                        <Slider
                          defaultValue={data.targeting.age}
                          min={16}
                          max={70}
                          step={1}
                          onValueChange={(v) => updateTargeting("age", v)}
                        />
                        <span className="text-xs w-10">{data.targeting.age[1]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Media upload */}
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-purple-600" />
                  <h3 className="text-sm font-semibold text-gray-700">Medien hochladen</h3>
                </div>
                <p className="text-xs text-gray-500">Laden Sie Bilder/Videos für die jeweiligen Formate hoch.</p>

                <div className="space-y-4">
                  {REQUIRED_FORMATS.map((fmt) => (
                    <div key={fmt} className="border rounded-xl p-4">
                      <div className="flex items-center justify-between gap-2">
                        <div>
                          <Label className="text-xs">Format</Label>
                          <div className="text-sm font-medium">{fmt}</div>
                        </div>
                        <Badge variant="secondary">empfohlen</Badge>
                      </div>

                      <div className="mt-3 flex items-center gap-3">
                        <Input
                          type="file"
                          accept="image/*,video/*"
                          onChange={(e) => onUpload(fmt, e.target.files?.[0] || null)}
                        />
                        {data.media[fmt] && (
                          <span className="text-xs text-emerald-600">
                            {data.media[fmt]?.name || "Datei gewählt"}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                Vorschau
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Pagination status */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {selectedChannels.length > 0
                    ? `Seite ${previewPage + 1} von ${totalPages} · ${selectedChannels.length} Kanal(e)`
                    : "Bitte wählen Sie im Schritt 1 mindestens einen Kanal aus."}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPreviewPage((p) => Math.max(0, p - 1))}
                    disabled={previewPage === 0}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" /> Zurück
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPreviewPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={previewPage >= totalPages - 1}
                  >
                    Weiter <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              </div>

              {/* Two-column preview grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {pageChannels.map((c) => (
                  <div key={c.id} className="text-center">
                    <div className="mb-4">{brandPill(c)}</div>
                    <PhoneMockup>
                      <div className="h-full w-full flex flex-col">
                        <div className="h-40 bg-neutral-100 flex items-center justify-center text-xs text-neutral-500">
                          {data.media["Story 9:16 (1080×1920)"]?.name || "Story/Video Platzhalter"}
                        </div>
                        <div className="p-3 space-y-1">
                          <div className="text-sm font-semibold line-clamp-2">{data.content.headline || "Ihre Überschrift"}</div>
                          <div className="text-xs text-gray-600 line-clamp-3">
                            {data.content.description || "Ihre Beschreibung erscheint hier. Kurz, prägnant und zielgruppengerecht."}
                          </div>
                          <div className="pt-2">
                            <Button className="w-full">{data.content.cta || "Jetzt bewerben"}</Button>
                          </div>
                        </div>
                      </div>
                    </PhoneMockup>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-emerald-600" />
                Budget & Freigabe
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left column: Form inputs (kept similar styling) */}
                <div className="lg:col-span-2 space-y-6">
                  <div className="border rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Budget</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <Label className="text-xs">Gesamtbudget (€)</Label>
                        <Input
                          type="number"
                          min={100}
                          value={data.budget.total}
                          onChange={(e) => updateBudget("total", Number(e.target.value || 0))}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Startdatum</Label>
                        <Input
                          type="date"
                          value={data.budget.startDate}
                          onChange={(e) => updateBudget("startDate", e.target.value)}
                        />
                      </div>
                      <div>
                        <Label className="text-xs">Enddatum</Label>
                        <Input
                          type="date"
                          value={data.budget.endDate}
                          onChange={(e) => updateBudget("endDate", e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-gray-700">Finale Prüfung</h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Info className="h-4 w-4" /> Inhalte werden vor Livegang manuell geprüft.
                      </div>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm">Budget bestätigt</span>
                      <Switch
                        checked={data.budgetConfirmed}
                        onCheckedChange={(v) => setData((p) => ({ ...p, budgetConfirmed: !!v }))}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm">Freigabe zur Schaltung</span>
                      <Switch
                        checked={data.finalApproval}
                        onCheckedChange={(v) => setData((p) => ({ ...p, finalApproval: !!v }))}
                      />
                    </div>
                  </div>
                </div>

                {/* Right column: CLEAN SUMMARY (überarbeitet) */}
                <div className="space-y-4">
                  <Card className="border-emerald-200">
                    <CardHeader className="py-3">
                      <CardTitle className="text-base">Zusammenfassung</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="text-xs text-gray-500 mb-1">Ziel</div>
                        <div className="text-sm font-medium">
                          {GOALS.find((g) => g.id === data.goal)?.title || "Nicht ausgewählt"}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-gray-500 mb-1">Kanäle</div>
                        <div className="flex flex-wrap gap-2">
                          {selectedChannels.length ? (
                            selectedChannels.map((c) => (
                              <span key={c.id} className="inline-flex items-center gap-2 border rounded-full px-2.5 py-1">
                                <img src={c.logo} alt={c.name} className="h-4 w-4 object-contain" />
                                <span className="text-xs">{c.name}</span>
                              </span>
                            ))
                          ) : (
                            <span className="text-sm">–</span>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-gray-500 mb-1">Texte</div>
                        <div className="space-y-1 text-sm">
                          <div><span className="text-gray-500">Überschrift:</span> {data.content.headline || "–"}</div>
                          <div className="line-clamp-3">
                            <span className="text-gray-500">Beschreibung:</span> {data.content.description || "–"}
                          </div>
                          <div><span className="text-gray-500">CTA:</span> {data.content.cta || "–"}</div>
                          <div className="truncate"><span className="text-gray-500">URL:</span> {data.content.url || "–"}</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs text-gray-500 mb-1">Zeitraum & Budget</div>
                        <div className="text-sm space-y-1">
                          <div>Budget: <b>{Number(data.budget.total || 0).toLocaleString("de-DE")} €</b></div>
                          <div>Start: {data.budget.startDate || "–"}</div>
                          <div>Ende: {data.budget.endDate || "–"}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button
                    disabled={!data.finalApproval || !data.budgetConfirmed || selectedChannels.length === 0}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Kampagne starten
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Footer nav */}
      <div className="mt-8 flex items-center justify-between">
        <Button variant="outline" onClick={prev} disabled={!canPrev}>
          <ArrowLeft className="h-4 w-4 mr-2" /> Zurück
        </Button>
        <Button onClick={next} disabled={!canNext}>
          Weiter <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
