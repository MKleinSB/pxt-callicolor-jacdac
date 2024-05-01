namespace modules {
    /**
     * CalliColor Calliope mini LED Ring
     */
    //% fixedInstance whenUsed block="CalliColor RGB-LED ring"
    //% block.loc.de="CalliColor RGB-LED-Ring"
    export const CallicolorLedRing = new LedClient("CalliColor LED ring?dev=self&num_pixels=12&variant=ring")

    /**
    * Custom color picker
    */
    //% blockId=CalliColorNumberPicker block="%value"
    //% blockHidden=true
    //% group="LED"
    //% value.fieldEditor="colornumber" value.fieldOptions.decompileLiterals=true
    //% value.fieldOptions.colours='["#ffffff","#ff0000","#ff7f00","#fffe00","#7fff00","#00ff00","#00ff7f","#00fffe","#0040ff","#0000ff","#6000ff","#fe00ff","#ff0040","#acb3f3","#e0acfe","#a300ff","#ea00ff","#ff00e3","#fdd3f8","#f1d07e","#a8b5f5","#C3C6D8", "#f3f2da","#727474", "#000000"]'
    //% value.fieldOptions.columns=5 value.fieldOptions.className='rgbColorPicker'  
    export function CalliColorNumberPicker(value: number) {
        return value;
    }

    /**
    * Konvertiert den Farbnamen in eine Zahl
    */
    //% blockId=CalliColor block="%c=CalliColorNumberPicker"
    //% group="LED" weight=83
    //% c.defl=0xff0000
    //% inlineInputMode=external
    export function CalliColor(c: number): number {
        return c;
    }

    /**
      * Converts red, green, blue channels into a RGB color
      * @param red value of the red channel between 0 and 255. eg: 255
      * @param green value of the green channel between 0 and 255. eg: 255
      * @param blue value of the blue channel between 0 and 255. eg: 255
      */
    //% weight=3
    //% blockId="rgb" block="red %red|green %green|blue %blue"
    //% block.loc.de="rot %red|grün %green|blau %blue"
    //% group="LED" weight=82
    export function rgb(red: number, green: number, blue: number): number {
        return ((red & 0xFF) << 16) | ((green & 0xFF) << 8) | (blue & 0xFF);
    }

}


namespace servers {
    function start() {
        jacdac.productIdentifier = 0x3c7da9d0
        jacdac.deviceDescription = "CalliColor Calliope-LED"
        jacdac.startSelfServers(() => {
            const pin = DigitalPin.P0
            pins.setPull(pin, PinPullMode.PullNone)
            const sendPixels = (pixels: Buffer, brightness: number) => light.sendWS2812BufferWithBrightness(pixels, pin, brightness)
            const servers = [
                new jacdac.LedServer(
                    12,
                    jacdac.LedPixelLayout.RgbGrb,
                    sendPixels, {
                    variant: jacdac.LedVariant.Ring
                }),

            ]
            return servers
        })
    }
    start()
}