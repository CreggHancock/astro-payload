module Stonks exposing (main)

import Browser
import Chart as C
import Chart.Attributes as CA
import Chart.Events as CE
import Chart.Item as CI
import Html as H
import Json.Decode as Decode


main : Program Decode.Value Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , subscriptions = \_ -> Sub.none
        , view = view
        }


type alias Flags =
    { dataPoints : List Datum }


type alias Datum =
    { x : Float, y : Float, z : Float }


type alias Model =
    { hovering : List (CI.One Datum CI.Dot), dataPoints : List Datum }


init : Decode.Value -> ( Model, Cmd Msg )
init flags =
    let
        dataPoints =
            Decode.decodeValue flagsDecoder flags
                |> Result.map .dataPoints
                |> Result.withDefault []
    in
    ( { hovering = [], dataPoints = dataPoints }, Cmd.none )


type Msg
    = OnHover (List (CI.One Datum CI.Dot))


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        OnHover hovering ->
            ( { model | hovering = hovering }, Cmd.none )


view : Model -> H.Html Msg
view model =
    C.chart
        [ CA.height 300
        , CA.width 300
        , CE.onMouseMove OnHover (CE.getNearest CI.dots)
        , CE.onMouseLeave (OnHover [])
        ]
        [ C.xLabels []
        , C.yLabels [ CA.withGrid ]
        , C.series .x
            [ C.interpolated .y [] [ CA.circle, CA.size 3 ]
            , C.interpolated .z [] [ CA.circle, CA.size 3 ]
            ]
            model.dataPoints
        , C.each model.hovering <|
            \_ item ->
                [ C.tooltip item [] [] [ H.text "$", CI.getY item |> String.fromFloat |> H.text ] ]
        ]


datumDecoder : Decode.Decoder Datum
datumDecoder =
    Decode.map3 Datum
        (Decode.field "x" Decode.float)
        (Decode.field "y" Decode.float)
        (Decode.field "z" Decode.float)


flagsDecoder : Decode.Decoder Flags
flagsDecoder =
    Decode.map Flags
        (Decode.field "dataPoints" <| Decode.list datumDecoder)
