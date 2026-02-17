import React, { useState } from 'react'
import { Languages } from '../../TypeScript/Enums/Language.enum';
import { LanguageManager } from '../../TypeScript/Managers/LanguageManager';
import SectionTitle from '../../WebComponents/Common/SectionTitle/SectionTitle';
import SharedInterface from '../../WebComponents/SharedInterface/SharedInterface';

import { MangaSection } from '../../WebComponents/Manga/MangaSection/MangaSection';
import { CardType } from '../../TypeScript/Enums/CardType.enum';

export default function Home(props: any) {
    const [languageManager] = useState<LanguageManager>(LanguageManager.getInstance());

    return(
        <>
        <SharedInterface>
        <div className="px-3">
            <h1 hidden>Home</h1>
            <MangaSection   sectionTitlePath="Home.READING_TITLE"
                            sectionHref="/reading"
                            cardType={CardType.Hover}
                            endPoint="manga/testMangaPreviewCard"/>

            <MangaSection   sectionTitlePath="Home.HOT_TITLE"
                            sectionHref="/hot"
                            cardType={CardType.Hover}
                            endPoint="manga/testMangaPreviewCard"/>

            <MangaSection   sectionTitlePath="Home.NEW_TITLE"
                            sectionHref="/new"
                            cardType={CardType.Hover}
                            endPoint="manga/testMangaPreviewCard"/>
        </div>
        </SharedInterface>
        </>
    );
}