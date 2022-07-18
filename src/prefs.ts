import { PreferencesGroup, PreferencesPage, PreferencesWindow } from '@gi/Adw'
import { log, logError }                                        from '@global'

export function init () {
    // TODO: Add i18n initialize in here
}

/**
 * Loader of preferences pages, we will fill `window` with pages export
 * from ./preferences/index.ts
 * @param window Preferences Window to show
 */
export function fillPreferencesWindow (window: PreferencesWindow) {
    // Loading text...
    const loading = new PreferencesPage ()
    const group = new PreferencesGroup ({ title: 'Loading....' })
    loading.add (group)
    window.add (loading)

    window.search_enabled = true

    // Load module async
    import ('./preferences/index.js')
        .then ((index) => {
            window.remove (loading)
            index.pages ().forEach ((page) => {
                window.add (page)
            })
        })
        .catch ((e) => {
            log ('[prefs] Failed to load ui')
            logError (e)
            group.description = e.message + '\n' + e.stack
        })
}
