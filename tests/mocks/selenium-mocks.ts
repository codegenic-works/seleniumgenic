import * as TypeMoq from 'typemoq';
import { Navigation, Options, WebDriver, Window } from 'selenium-webdriver';

export function setupWebDriverMock(): {
    driverMock: TypeMoq.IMock<WebDriver>;
    getCurrentUrlResolvedValue: string;
    navigationMock: TypeMoq.IMock<Navigation>;
    optionsMock: TypeMoq.IMock<Options>;
    takeScreenshotResolvedValue: string;
    windowMock: TypeMoq.IMock<Window>;
} {
    const navigationMock: TypeMoq.IMock<Navigation> =
        TypeMoq.Mock.ofType(Navigation);

    const driverMock: TypeMoq.IMock<WebDriver> = TypeMoq.Mock.ofType(WebDriver);

    const optionsMock: TypeMoq.IMock<Options> = TypeMoq.Mock.ofType(Options);

    const windowMock: TypeMoq.IMock<Window> = TypeMoq.Mock.ofType(Window);

    optionsMock.setup((x) => x.window()).returns(() => windowMock.object);

    const getCurrentUrlResolvedValue = 'https://www.example.com';

    driverMock
        .setup((x) => x.getCurrentUrl())
        .returns(async () => getCurrentUrlResolvedValue);

    driverMock.setup((x) => x.navigate()).returns(() => navigationMock.object);

    driverMock.setup((x) => x.manage()).returns(() => optionsMock.object);

    const takeScreenshotResolvedValue = 'base64encoded';

    driverMock
        .setup((x) => x.takeScreenshot())
        .returns(async () => takeScreenshotResolvedValue);

    return {
        driverMock,
        getCurrentUrlResolvedValue,
        navigationMock,
        optionsMock,
        takeScreenshotResolvedValue,
        windowMock
    };
}
