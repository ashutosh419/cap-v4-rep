using CatalogService as service from '../../srv/cat-service';

annotate service.Books with @(
    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'ID',
                Value: ID,
            },
            {
                $Type: 'UI.DataField',
                Label: 'title',
                Value: title,
            },
            {
                $Type: 'UI.DataField',
                Label: 'stock',
                Value: stock,
            },
        ],
    },
    UI.Facets                    : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'GeneratedFacet1',
        Label : 'General Information',
        Target: '@UI.FieldGroup#GeneratedGroup',
    }, ],
    UI.LineItem                  : [
        {
            $Type: 'UI.DataField',
            Label: 'ID',
            Value: ID,
        },
        {
            $Type: 'UI.DataField',
            Label: 'title',
            Value: title,
        },
        {
            $Type: 'UI.DataField',
            Label: 'stock',
            Value: stock,
        },
        {
            $Type: 'UI.DataField',
            Value: Subtitle,
            Label: 'Subtitle',
        },
        {
            $Type: 'UI.DataField',
            Value: price,
            Label: 'price',
        },
        {
            $Type: 'UI.DataField',
            Value: currency_code,
            Label: 'currency_code',
        },
        {
            $Type: 'UI.DataField',
            Value: author,
            Label: 'author',
        },
    ],
);
